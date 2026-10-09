const fs = require('fs');
const path = require('path');

const contentFilePath = 'C:/Users/wahyu/.gemini/antigravity-ide/brain/f673ef1c-8028-418a-b832-e4c939057c53/.system_generated/steps/28/content.md';
let fileStr = fs.readFileSync(contentFilePath, 'utf8');

const startIdx = fileStr.indexOf('window.CONTENT = {');
if (startIdx === -1) {
  console.error('Could not find window.CONTENT');
  process.exit(1);
}

const jsCode = fileStr.slice(startIdx);
const window = {};
eval(jsCode);
const C = window.CONTENT;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function saveBase64(dataUri, outPath) {
  if (!dataUri || !dataUri.startsWith('data:')) return dataUri;
  const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return dataUri;
  }
  const buffer = Buffer.from(matches[2], 'base64');
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, buffer);
  console.log('Saved:', outPath, `(${buffer.length} bytes)`);
  return '/' + path.relative('c:/laragon/www/gunungputri-square/public', outPath).replace(/\\/g, '/');
}

const publicDir = 'c:/laragon/www/gunungputri-square/public/images';
ensureDir(publicDir);

// 1. Logo
C.brand.logo = saveBase64(C.brand.logo, path.join(publicDir, 'logo.png'));

// 2. Promo Banner
if (C.promoBanner && C.promoBanner.slides) {
  C.promoBanner.slides.forEach((s, idx) => {
    s.image = saveBase64(s.image, path.join(publicDir, 'promo', `promo-${idx + 1}.jpg`));
  });
}

// 3. Hero
C.hero.image = saveBase64(C.hero.image, path.join(publicDir, 'hero.webp'));

// 4. About
C.about.image = saveBase64(C.about.image, path.join(publicDir, 'about.webp'));

// 5. Units (Towers)
if (C.units && C.units.towers) {
  C.units.towers.forEach((t) => {
    const slug = t.name.toLowerCase().includes('pinus') ? 'pinus' : 'palem';
    t.image = saveBase64(t.image, path.join(publicDir, 'towers', `${slug}.webp`));
  });
}

// 6. Unit Types (Floorplans)
if (C.unitTypes && C.unitTypes.tabs) {
  C.unitTypes.tabs.forEach((tab) => {
    const tabSlug = tab.id.replace('tower-', '');
    tab.units.forEach((u, idx) => {
      const ext = (u.floorplan && u.floorplan.includes('image/jpeg')) ? 'jpg' : 'png';
      const uSlug = u.name.toLowerCase().replace(/\s+/g, '-') + '-' + u.size.replace(/[^\w]/g, '');
      u.floorplan = saveBase64(u.floorplan, path.join(publicDir, 'floorplans', `${tabSlug}-${uSlug}.${ext}`));
    });
  });
}

// 7. Gallery
if (C.gallery && C.gallery.items) {
  C.gallery.items.forEach((g, idx) => {
    g.src = saveBase64(g.src, path.join(publicDir, 'gallery', `gallery-${idx + 1}.webp`));
  });
}

// 8. Testimonials
if (C.testimonials && C.testimonials.items) {
  C.testimonials.items.forEach((t, idx) => {
    t.photo = saveBase64(t.photo, path.join(publicDir, 'testimonials', `testi-${idx + 1}.jpg`));
  });
}

// 9. Articles
if (C.articles && C.articles.portalItems) {
  C.articles.portalItems.forEach((a, idx) => {
    if (a.image && a.image.startsWith('data:')) {
      a.image = saveBase64(a.image, path.join(publicDir, 'articles', `article-${idx + 1}.jpg`));
    }
  });
}

// Write src/data/content.js
const srcDataDir = 'c:/laragon/www/gunungputri-square/src/data';
ensureDir(srcDataDir);

const outputContentFile = path.join(srcDataDir, 'content.js');
fs.writeFileSync(outputContentFile, 'export const CONTENT = ' + JSON.stringify(C, null, 2) + ';\nexport default CONTENT;\n', 'utf8');
console.log('Successfully generated', outputContentFile);
