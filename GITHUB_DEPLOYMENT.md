# GitHub Deployment Guide

## Step 1: Push Your Code to GitHub

### Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click **New repository**
3. Name it: `portfolio` or `your-username.github.io` (for custom domain)
4. Make it **Public**
5. **Don't** initialize with README (we already have one)

### Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

## Step 2: Setup Google Sheets (Follow CONTACT_FORM_SETUP.md)

1. Create Google Sheet with contact form script
2. Get your deployment URL
3. Update the Contact.tsx file with your actual URL

## Step 3: Deploy Options

### Option A: GitHub Pages (Free)

1. Go to your repository on GitHub
2. **Settings** → **Pages**
3. Source: **GitHub Actions**
4. The workflow file (`.github/workflows/deploy.yml`) will automatically deploy your site
5. Your site will be available at: `https://YOUR_USERNAME.github.io/portfolio`

### Option B: Netlify (Recommended - Easy Custom Domain)

1. Go to [Netlify](https://netlify.com)
2. **Add new site** → **Import an existing project**
3. Connect to GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
5. Click **Deploy site**
6. Your site gets a random URL like `amazing-name-123456.netlify.app`
7. To add custom domain: **Site settings** → **Domain management** → **Add custom domain**

### Option C: Vercel (Modern & Fast)

1. Go to [Vercel](https://vercel.com)
2. **Import Project** from GitHub
3. Select your portfolio repository
4. Vercel auto-detects settings
5. Click **Deploy**
6. Custom domain: **Project Settings** → **Domains**

## Step 4: Get Free Student Domain

### GitHub Student Developer Pack
1. Apply at: https://education.github.com/pack
2. Choose domain provider:
   - **Name.com**: `.dev`, `.codes`, `.engineer` domains
   - **Namecheap**: `.me` domain
   - **.TECH**: `.tech` domain

### Recommended Domains for You:
- `abdulrasheed.dev`
- `talal.codes`  
- `abdul-rasheed.me`
- `abdultalal.tech`

## Step 5: Connect Custom Domain

### For Netlify:
1. **Site settings** → **Domain management**
2. **Add custom domain** → Enter your domain
3. Follow DNS setup instructions
4. Netlify provides free SSL certificate

### For GitHub Pages:
1. **Repository Settings** → **Pages**
2. **Custom domain** → Enter your domain
3. **Enforce HTTPS** ✓
4. Update DNS at your domain provider:
   - **Type**: A
   - **Name**: @
   - **Value**: 185.199.108.153 (and other GitHub IPs)

### For Vercel:
1. **Project Settings** → **Domains**
2. **Add** → Enter your domain
3. Follow DNS instructions
4. Automatic SSL included

## Step 6: Final Updates

1. **Update Contact Form**: Replace `YOUR_SCRIPT_ID` with real Google Apps Script URL
2. **Test Contact Form**: Submit a test message and check Google Sheet
3. **Test on Mobile**: Ensure responsive design works perfectly
4. **Check Performance**: Use Google PageSpeed Insights

## File Structure After Deployment

```
portfolio/
├── dist/public/          # Built static files (deployed)
├── client/src/           # React source code
├── server/               # Not used in static deployment
├── .github/workflows/    # GitHub Actions for auto-deploy
├── DEPLOYMENT_GUIDE.md   # This file
├── CONTACT_FORM_SETUP.md # Google Sheets setup
└── README.md             # Project documentation
```

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Google Sheets contact form working
- [ ] Site deployed and accessible
- [ ] Custom domain connected (if using)
- [ ] SSL certificate active
- [ ] Mobile responsive
- [ ] Contact form tested
- [ ] All animations working

Your portfolio is now live and professional! 🚀