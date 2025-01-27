const fs = require('fs');
const path = require('path');

try {
  // Create blog directory if it doesn't exist
  const blogDir = path.join(__dirname, 'out', 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Copy index file if it exists
  const sourcePath = path.join(__dirname, 'out', 'blog.html');
  const destPath = path.join(blogDir, 'index.html');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('Successfully copied blog index file');
  } else {
    console.log('Blog index file already in correct location');
  }
} catch (error) {
  console.error('Error in postbuild script:', error);
  // Don't exit with error - allow build to complete
} 