#!/usr/bin/env node

// Build script for static deployment
// This builds the frontend only for static hosting

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🏗️  Building static portfolio for deployment...\n');

try {
  // Build the frontend with Vite
  console.log('📦 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Copy any additional assets
  console.log('📁 Copying assets...');
  
  // Create a simple index.html redirect if needed
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    console.log('📂 Static files are in the /dist directory');
    console.log('🚀 Ready for deployment to GitHub Pages, Netlify, or Vercel');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}