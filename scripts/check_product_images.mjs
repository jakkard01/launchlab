import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const productsPath = path.join(root, "src", "data", "products.json");
const imagesPath = path.join(root, "src", "data", "product_images.json");
const publicRoot = path.join(root, "public");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const images = JSON.parse(fs.readFileSync(imagesPath, "utf-8"));

const missingImageKey = [];
const missingMapping = [];
const missingFile = [];
const missingAlt = [];

for (const product of products) {
  if (!product.imageKey) {
    missingImageKey.push(`${product.id} (${product.name})`);
    continue;
  }
  const entry = images[product.imageKey];
  if (!entry) {
    missingMapping.push(`${product.id} -> ${product.imageKey}`);
    continue;
  }
  if (!entry.alt) {
    missingAlt.push(`${product.id} -> ${product.imageKey}`);
  }
  const filePath = path.join(publicRoot, entry.src.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    missingFile.push(`${product.id} -> ${entry.src}`);
  }
}

const report = (label, items) => {
  if (items.length === 0) {
    console.log(`${label}: OK`);
    return;
  }
  console.log(`${label}:`);
  items.forEach((item) => console.log(`- ${item}`));
};

report("Missing imageKey", missingImageKey);
report("Missing mapping", missingMapping);
report("Missing file", missingFile);
report("Missing alt", missingAlt);

const hasIssues =
  missingImageKey.length ||
  missingMapping.length ||
  missingFile.length ||
  missingAlt.length;

process.exit(hasIssues ? 1 : 0);
