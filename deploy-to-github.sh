#!/bin/bash

# GitHub Pages Deployment Script
# Run this script to deploy your portfolio to GitHub Pages

set -e  # Exit on any error

echo "🚀 GitHub Pages Deployment Script"
echo "================================="
echo ""

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Step 1: Initializing Git repository..."
    git init
    git branch -M main
    
    # Set git config (you'll need to replace with your info)
    echo "⚙️  Setting up Git configuration..."
    read -p "Enter your full name: " GIT_NAME
    read -p "Enter your email: " GIT_EMAIL
    
    git config user.name "$GIT_NAME"
    git config user.email "$GIT_EMAIL"
    echo "✅ Git initialized and configured"
else
    echo "✅ Git repository already exists"
fi

echo ""

# Step 2: Build the project
echo "🏗️  Step 2: Building your portfolio..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""

# Step 3: Add and commit files
echo "📁 Step 3: Preparing files for GitHub..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    git commit -m "Portfolio deployment - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ Files committed to git"
fi

echo ""

# Step 4: GitHub repository setup
echo "🔗 Step 4: GitHub Repository Setup"
echo ""
echo "Now you need to:"
echo "1. Go to https://github.com"
echo "2. Create a new repository named 'portfolio'"
echo "3. Make it PUBLIC (required for free GitHub Pages)"
echo "4. DO NOT add README, .gitignore, or license"
echo "5. Copy the repository URL"
echo ""

read -p "Have you created the GitHub repository? (y/n): " CREATED_REPO

if [ "$CREATED_REPO" != "y" ]; then
    echo "Please create the GitHub repository first, then run this script again."
    exit 1
fi

# Step 5: Add remote and push
echo ""
read -p "Enter your GitHub repository URL (https://github.com/username/portfolio.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL cannot be empty"
    exit 1
fi

echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true  # Remove if exists
git remote add origin "$REPO_URL"

echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉 SUCCESS! Your code is now on GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' tab"
echo "3. Scroll to 'Pages' in left sidebar"
echo "4. Under 'Source', select 'GitHub Actions'"
echo "5. Wait for deployment to complete (check 'Actions' tab)"
echo "6. Your site will be live at: https://YOUR_USERNAME.github.io/portfolio"
echo ""
echo "📖 For detailed instructions, see: STEP_BY_STEP_GITHUB_PAGES.md"
echo ""
echo "🔗 Don't forget to set up Google Sheets contact form!"
echo "   See: CONTACT_FORM_SETUP.md"