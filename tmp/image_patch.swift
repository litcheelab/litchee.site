import AppKit

func load(_ path: String) -> NSImage {
    guard let image = NSImage(contentsOfFile: path) else {
        fatalError("Unable to load image: \(path)")
    }
    return image
}

func writePNG(_ image: NSImage, to path: String) {
    guard let data = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: data),
          let png = rep.representation(using: .png, properties: [:]) else {
        fatalError("Unable to encode PNG")
    }
    try! png.write(to: URL(fileURLWithPath: path))
}

let args = CommandLine.arguments
guard args.count >= 3 else {
    fatalError("Usage: image_patch crop|paste ...")
}

switch args[1] {
case "crop":
    guard args.count == 8 else {
        fatalError("crop input output x y width height")
    }
    let input = load(args[2])
    let output = args[3]
    let rect = NSRect(
        x: Double(args[4])!,
        y: Double(args[5])!,
        width: Double(args[6])!,
        height: Double(args[7])!
    )
    let result = NSImage(size: rect.size)
    result.lockFocus()
    input.draw(
        in: NSRect(origin: .zero, size: rect.size),
        from: rect,
        operation: .copy,
        fraction: 1
    )
    result.unlockFocus()
    writePNG(result, to: output)

case "paste":
    guard args.count == 7 else {
        fatalError("paste base patch output x y")
    }
    let base = load(args[2])
    let patch = load(args[3])
    let output = args[4]
    let point = NSPoint(x: Double(args[5])!, y: Double(args[6])!)
    let result = NSImage(size: base.size)
    result.lockFocus()
    base.draw(in: NSRect(origin: .zero, size: base.size), from: .zero, operation: .copy, fraction: 1)
    patch.draw(at: point, from: .zero, operation: .copy, fraction: 1)
    result.unlockFocus()
    writePNG(result, to: output)

default:
    fatalError("Unknown action: \(args[1])")
}
