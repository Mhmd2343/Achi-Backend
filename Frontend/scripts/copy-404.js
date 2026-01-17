/**
 * Post-build script to copy index.html to 404.html for GitHub Pages SPA routing
 * 
 * GitHub Pages serves 404.html for any missing route. By copying the built
 * index.html (which has injected script tags) to 404.html, we ensure that:
 * 1. The React app loads correctly when accessing routes directly
 * 2. All JS/CSS bundles load with correct paths
 * 3. React Router can handle the client-side routing
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');
const notFoundHtmlPath = path.join(buildDir, '404.html');

try {
  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  // Check if index.html exists
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found in build directory.');
    process.exit(1);
  }

  // Copy index.html to 404.html
  fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
  console.log('✓ Successfully copied index.html to 404.html');
} catch (error) {
  console.error('Error copying index.html to 404.html:', error);
  process.exit(1);
}

