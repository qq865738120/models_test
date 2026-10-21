import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

func fail(_ text: String) -> Never {
    FileHandle.standardError.write(Data((text + "\n").utf8))
    exit(1)
}
let args = CommandLine.arguments
guard args.count == 4, let pageNumber = Int(args[2]), pageNumber > 0 else {
    fail("Usage: tools/pdf-page INPUT.pdf PAGE_NUMBER OUTPUT.png (page numbers start at 1)")
}
guard let document = CGPDFDocument(URL(fileURLWithPath: args[1]) as CFURL),
      let page = document.page(at: pageNumber) else {
    fail("Cannot open PDF or requested page.")
}
let bounds = page.getBoxRect(.mediaBox)
let width = Int(ceil(bounds.width * 2)), height = Int(ceil(bounds.height * 2))
guard let context = CGContext(data: nil, width: width, height: height,
                              bitsPerComponent: 8, bytesPerRow: 0,
                              space: CGColorSpaceCreateDeviceRGB(),
                              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
    fail("Cannot render this page.")
}
let target = CGRect(x: 0, y: 0, width: width, height: height)
context.setFillColor(CGColor(gray: 1, alpha: 1))
context.fill(target)
context.scaleBy(x: 2, y: 2)
context.concatenate(page.getDrawingTransform(.mediaBox,
                                              rect: CGRect(origin: .zero, size: bounds.size), rotate: 0,
                                              preserveAspectRatio: true))
context.drawPDFPage(page)
let data = NSMutableData()
guard let image = context.makeImage(),
      let destination = CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil) else {
    fail("Cannot encode this page.")
}
CGImageDestinationAddImage(destination, image, nil)
guard CGImageDestinationFinalize(destination) else { fail("Cannot finish PNG.") }
do {
    // Never overwrite an earlier screenshot.
    try (data as Data).write(to: URL(fileURLWithPath: args[3]), options: .withoutOverwriting)
    print("Rendered page \(pageNumber)/\(document.numberOfPages): \(args[3])")
} catch {
    fail("Cannot save PNG: \(error)")
}
