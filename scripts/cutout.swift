// Background removal via Vision's foreground-instance mask — the same
// subject-lifting model Photos uses. Offline, no model download.
// usage: swift scripts/cutout.swift <input> <output.png> [instance|person|both]
import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: cutout <input> <output.png>\n".data(using: .utf8)!)
    exit(64)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let source = CIImage(contentsOf: inURL) else {
    FileHandle.standardError.write("cannot read \(inURL.path)\n".data(using: .utf8)!)
    exit(1)
}

// mode: instance (generic foreground), person (person segmentation,
// tighter around heads), or both (their intersection).
let mode = args.count > 3 ? args[3] : "instance"
let handler = VNImageRequestHandler(ciImage: source, options: [:])

func fit(_ buffer: CVPixelBuffer) -> CIImage {
    let m = CIImage(cvPixelBuffer: buffer)
    return m.transformed(by: CGAffineTransform(scaleX: source.extent.width / m.extent.width,
                                               y: source.extent.height / m.extent.height))
}

func instanceMask() throws -> CIImage? {
    let req = VNGenerateForegroundInstanceMaskRequest()
    try handler.perform([req])
    guard let res = req.results?.first, !res.allInstances.isEmpty else { return nil }
    return fit(try res.generateScaledMaskForImage(forInstances: res.allInstances, from: handler))
}

func personMask() throws -> CIImage? {
    let req = VNGeneratePersonSegmentationRequest()
    req.qualityLevel = .accurate
    req.outputPixelFormat = kCVPixelFormatType_OneComponent8
    try handler.perform([req])
    guard let obs = req.results?.first else { return nil }
    return fit(obs.pixelBuffer)
}

var scaledMask: CIImage
do {
    switch mode {
    case "person":
        guard let m = try personMask() else {
            FileHandle.standardError.write("no person detected\n".data(using: .utf8)!); exit(2)
        }
        scaledMask = m
    case "both":
        guard let a = try instanceMask(), let b = try personMask() else {
            FileHandle.standardError.write("one of the two masks came back empty\n".data(using: .utf8)!); exit(2)
        }
        // Intersection: darkest wins, so background either model rejects is dropped.
        guard let f = CIFilter(name: "CIDarkenBlendMode") else { exit(1) }
        f.setValue(a, forKey: kCIInputImageKey)
        f.setValue(b, forKey: kCIInputBackgroundImageKey)
        guard let combined = f.outputImage else { exit(1) }
        scaledMask = combined.cropped(to: source.extent)
    default:
        guard let m = try instanceMask() else {
            FileHandle.standardError.write("no foreground subject detected\n".data(using: .utf8)!); exit(2)
        }
        scaledMask = m
    }
} catch {
    FileHandle.standardError.write("vision failed: \(error)\n".data(using: .utf8)!)
    exit(1)
}

guard let blend = CIFilter(name: "CIBlendWithMask") else { exit(1) }
blend.setValue(source, forKey: kCIInputImageKey)
blend.setValue(CIImage.empty(), forKey: kCIInputBackgroundImageKey)
blend.setValue(scaledMask, forKey: kCIInputMaskImageKey)

guard let out = blend.outputImage?.cropped(to: source.extent) else {
    FileHandle.standardError.write("blend produced nothing\n".data(using: .utf8)!)
    exit(1)
}

let ctx = CIContext()
do {
    try ctx.writePNGRepresentation(of: out, to: outURL,
                                   format: .RGBA8,
                                   colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
} catch {
    FileHandle.standardError.write("write failed: \(error)\n".data(using: .utf8)!)
    exit(1)
}

print("mode: \(mode)  size: \(Int(source.extent.width))x\(Int(source.extent.height))  -> \(outURL.lastPathComponent)")
