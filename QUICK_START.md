# 🚀 Quick Start - Deploy to GitHub Pages

## Method 1: Use the Deployment Script (Easiest)

### Step 1: Run the deployment script
```bash
./deploy-to-github.sh
```

The script will:
- Initialize git if needed
- Build your portfolio
- Guide you through GitHub setup
- Push your code to GitHub

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. **Settings** → **Pages**
3. Source: **GitHub Actions**
4. Wait for deployment (check **Actions** tab)

## Method 2: Manual Deployment

### Step 1: Initialize Git and Build
```bash
git init
git branch -M main
git config user.name "Your Name"
git config user.email "your-email@example.com"
npm run build
git add .
git commit -m "Initial portfolio commit"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Create new repository: `portfolio`
3. Make it **PUBLIC**
4. Copy the repository URL

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

## After Deployment

### Set Up Contact Form
1. Create Google Sheet: "Portfolio Contacts"
2. Add columns: Name, Email, Subject, Message, Timestamp
3. Create Google Apps Script (see `CONTACT_FORM_SETUP.md`)
4. Update contact form with your script URL
5. Rebuild and push: `git add . && git commit -m "Added contact form" && git push`

### Get Free Domain (Optional)
1. Apply for GitHub Student Developer Pack
2. Get free `.dev`, `.me`, or `.tech` domain
3. Connect to GitHub Pages

## Your Portfolio Features

✅ **Professional Design** - Modern, clean, responsive
✅ **Dark/Light Mode** - Automatic theme switching
✅ **Contact Form** - Google Sheets integration
✅ **Smooth Animations** - Scroll-triggered effects
✅ **SEO Optimized** - Meta tags and structure
✅ **Mobile First** - Works on all devices

## Total Time: 15 minutes

Your portfolio showcases:
- React & TypeScript skills
- Modern web development
- Professional design
- Real deployment experience

**Ready to get your portfolio live? Run `./deploy-to-github.sh` now!**