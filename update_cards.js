const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Green-Meadows-Clone', 'artifacts', 'vivanta-green-meadows', 'src', 'components');

const filesToUpdate = [
  'Investment.tsx', 'Contact.tsx', 'HeritagVision.tsx', 'MasterPlan.tsx',
  'Hero.tsx', 'Gallery.tsx', 'Connectivity.tsx', 'Amenities.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace bg-white/X with bg-bentley-green-50/90
  // Replace border-white/X or border-[#c3dcbe]/X with border-forest-900/10
  
  content = content.replace(/bg-white\/(?:[0-9]+)\s+backdrop-blur-(?:sm|md|lg)/g, 'bg-bentley-green-50/90 backdrop-blur-md');
  
  // Specific border fixes for cards we just touched
  content = content.replace(/border-white\/[0-9]+/g, 'border-forest-900/10');
  content = content.replace(/border-\[\#c3dcbe\]\/50/g, 'border-forest-900/10');

  // If there's shadow-sm or shadow-xl we want to harmonize it a bit to shadow-luxury-lg if it's a major card
  // But let's just do the backgrounds as requested: "make the background of all cards ... same as the background of navbar"
  // The user explicitly asked for the background to be the same as the navbar.

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
