import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('public/assets');

async function extract() {
  console.log('Extracting assets with sharp...');

  // 1. Collections cards from collections-reference.jpg (1024 x 631)
  // Cards are located around y: 250 to 600
  await sharp(path.join(assetsDir, 'collections-reference.jpg'))
    .extract({ left: 45, top: 250, width: 295, height: 350 })
    .toFile(path.join(assetsDir, 'collection-core.jpg'));

  await sharp(path.join(assetsDir, 'collections-reference.jpg'))
    .extract({ left: 365, top: 250, width: 295, height: 350 })
    .toFile(path.join(assetsDir, 'collection-festive.jpg'));

  await sharp(path.join(assetsDir, 'collections-reference.jpg'))
    .extract({ left: 685, top: 250, width: 295, height: 350 })
    .toFile(path.join(assetsDir, 'collection-limited.jpg'));

  // 2. About sewing machine from about-reference.jpg (882 x 442)
  await sharp(path.join(assetsDir, 'about-reference.jpg'))
    .extract({ left: 0, top: 50, width: 420, height: 390 })
    .toFile(path.join(assetsDir, 'about-craftsmanship.jpg'));

  // 3. Journal cards from journal-reference.jpg (856 x 484)
  await sharp(path.join(assetsDir, 'journal-reference.jpg'))
    .extract({ left: 24, top: 160, width: 250, height: 145 })
    .toFile(path.join(assetsDir, 'journal-denim.jpg'));

  await sharp(path.join(assetsDir, 'journal-reference.jpg'))
    .extract({ left: 295, top: 160, width: 250, height: 145 })
    .toFile(path.join(assetsDir, 'journal-spool.jpg'));

  await sharp(path.join(assetsDir, 'journal-reference.jpg'))
    .extract({ left: 565, top: 160, width: 250, height: 145 })
    .toFile(path.join(assetsDir, 'journal-mannequin.jpg'));

  // 4. Product detail main and thumbnails from product-detail-reference.jpg (646 x 478)
  await sharp(path.join(assetsDir, 'product-detail-reference.jpg'))
    .extract({ left: 88, top: 85, width: 252, height: 360 })
    .toFile(path.join(assetsDir, 'denim-vest-main.jpg'));

  await sharp(path.join(assetsDir, 'product-detail-reference.jpg'))
    .extract({ left: 12, top: 95, width: 62, height: 75 })
    .toFile(path.join(assetsDir, 'denim-vest-thumb1.jpg'));

  await sharp(path.join(assetsDir, 'product-detail-reference.jpg'))
    .extract({ left: 12, top: 202, width: 62, height: 75 })
    .toFile(path.join(assetsDir, 'denim-vest-thumb2.jpg'));

  await sharp(path.join(assetsDir, 'product-detail-reference.jpg'))
    .extract({ left: 12, top: 310, width: 62, height: 75 })
    .toFile(path.join(assetsDir, 'denim-vest-thumb3.jpg'));

  // 5. Hero model from hero-reference.jpg (1024 x 473)
  // The hero section starts below navigation around y: 60
  await sharp(path.join(assetsDir, 'hero-reference.jpg'))
    .extract({ left: 0, top: 55, width: 1024, height: 418 })
    .toFile(path.join(assetsDir, 'hero-banner.jpg'));

  await sharp(path.join(assetsDir, 'hero-reference.jpg'))
    .extract({ left: 350, top: 60, width: 350, height: 410 })
    .toFile(path.join(assetsDir, 'hero-model.jpg'));

  console.log('All image assets extracted successfully!');
}

extract().catch(console.error);

