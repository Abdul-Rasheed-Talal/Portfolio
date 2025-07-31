#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy your portfolio to GitHub

echo "🚀 Portfolio Deployment Helper"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git branch -M main
fi

# Build the project
echo "🏗️  Building portfolio..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Static files created in dist/public/"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Portfolio ready for deployment - $(date)"

echo ""
echo "🎉 Your portfolio is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Create a repository on GitHub"
echo "2. Set up Google Sheets contact form (see CONTACT_FORM_SETUP.md)"
echo "3. Push to GitHub: git remote add origin YOUR_REPO_URL"
echo "4. Push: git push -u origin main"
echo "5. Enable GitHub Pages or deploy to Netlify/Vercel"
echo ""
echo "📚 See GITHUB_DEPLOYMENT.md for detailed instructions"