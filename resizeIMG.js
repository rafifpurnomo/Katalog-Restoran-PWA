const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// Path folder untuk gambar asli dan hasil output
const inputFolder = "./src/public/images/heros";
const outputFolder = "./src/public/images/resizeIMG";

// Ukuran resolusi yang ingin dihasilkan
const sizes = [
  { name: "large", width: 1200 },
  { name: "medium", width: 800 },
  { name: "small", width: 500 }
];

// Pastikan folder output ada
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Fungsi untuk mengubah ukuran gambar
const resizeImages = async () => {
  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    const inputPath = path.join(inputFolder, file);

    for (const size of sizes) {
      const outputPath = path.join(
        outputFolder,
        `${path.parse(file).name}-${size.name}.jpg`
      );

      await sharp(inputPath)
        .resize({ width: size.width })
        .toFile(outputPath);

      console.log(`Created: ${outputPath}`);
    }
  }
};

resizeImages().catch((err) => console.error("Error resizing images:", err));
