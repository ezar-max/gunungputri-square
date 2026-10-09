const fs = require('fs');
const path = require('path');

const contentFilePath = 'C:/Users/wahyu/.gemini/antigravity-ide/brain/f673ef1c-8028-418a-b832-e4c939057c53/.system_generated/steps/28/content.md';
let fileStr = fs.readFileSync(contentFilePath, 'utf8');

// Strip markdown header
const startIdx = fileStr.indexOf('window.CONTENT = {');
if (startIdx === -1) {
  console.error('Could not find window.CONTENT');
  process.exit(1);
}

const jsCode = fileStr.slice(startIdx);
// Run in sandbox to get CONTENT object
const window = {};
eval(jsCode);
const CONTENT = window.CONTENT;

console.log('CONTENT loaded successfully!');
console.log('Brand:', CONTENT.brand.name);
console.log('Towers:', CONTENT.units.towers.map(t => t.name));
console.log('Tabs:', CONTENT.unitTypes.tabs.map(t => t.label));
console.log('Gallery items:', CONTENT.gallery.items.length);
console.log('Testimonials:', CONTENT.testimonials.items.length);
console.log('Promo slides:', CONTENT.promoBanner.slides.length);
