const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const distPath = path.join(__dirname, 'build');

// Get all JavaScript files in the dist folder, excluding subfolders
const files = getFiles(distPath);

function getFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively get files in subfolders
      files = files.concat(getFiles(filePath));
    } else if (filePath.endsWith('.js')) {
      // Only add JavaScript files in the dist folder
      files.push(filePath);
    }
  });
  return files;
}

// Minify each file
files.forEach((file) => {
  const code = fs.readFileSync(file, 'utf8');
  const result = UglifyJS.minify(code, {
    mangle: true,
  });

  if (result.error) {
    console.error(result.error);
  } else {
    fs.writeFileSync(file, result.code);
  }
});
