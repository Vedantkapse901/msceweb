const fs = require('fs');
const path = require('path');

// Create .vercel output directory structure
const outputDir = '.vercel/output/static';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy web folder to .vercel/output/static
const webDir = 'web';
const files = fs.readdirSync(webDir);

files.forEach(file => {
  const src = path.join(webDir, file);
  const dest = path.join(outputDir, file);

  if (fs.statSync(src).isDirectory()) {
    // Copy directory recursively
    fs.cpSync(src, dest, { recursive: true });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
  }
});

console.log('Build complete: web folder copied to Vercel output');
