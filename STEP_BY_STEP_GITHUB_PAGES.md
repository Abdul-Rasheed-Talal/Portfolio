# Complete GitHub Pages Deployment Guide

## Prerequisites
- GitHub account (free)
- Your portfolio code ready

## Step 1: Create GitHub Repository (5 minutes)

### 1.1 Go to GitHub
1. Open your web browser
2. Go to https://github.com
3. Sign in to your account

### 1.2 Create New Repository
1. Click the green **"New"** button (top left, next to "Repositories")
2. Repository name: `portfolio` (or `your-username.github.io` for default GitHub Pages URL)
3. Description: `My professional portfolio website`
4. Make sure it's **Public** (required for free GitHub Pages)
5. **DO NOT** check "Add a README file" (we already have one)
6. **DO NOT** check "Add .gitignore" 
7. **DO NOT** choose a license yet
8. Click **"Create repository"**

### 1.3 Copy Repository URL
1. You'll see a page with setup instructions
2. Copy the HTTPS URL (looks like: `https://github.com/YOUR_USERNAME/portfolio.git`)
3. Keep this tab open

## Step 2: Prepare Your Code for GitHub (3 minutes)

### 2.1 Initialize Git Repository
In your Replit terminal, run these commands one by one:

```bash
# Navigate to your project root (if not already there)
cd /home/runner/YOUR_PROJECT_NAME

# Initialize git repository
git init

# Set default branch to main
git branch -M main

# Configure git with your information
git config user.name "Your Full Name"
git config user.email "your-email@example.com"
```

### 2.2 Add All Files to Git
```bash
# Add all files to staging
git add .

# Check what files will be committed
git status

# Make your first commit
git commit -m "Initial portfolio commit - ready for deployment"
```

## Step 3: Connect to GitHub Repository (2 minutes)

### 3.1 Add Remote Repository
```bash
# Replace YOUR_USERNAME and portfolio with your actual values
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify the remote was added correctly
git remote -v
```

### 3.2 Push Code to GitHub
```bash
# Push your code to GitHub
git push -u origin main
```

**If this fails with authentication error:**
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Give it "repo" permissions
4. Use token as password when prompted

## Step 4: Enable GitHub Pages (3 minutes)

### 4.1 Go to Repository Settings
1. Go back to your GitHub repository page
2. Click **"Settings"** tab (top right of repository page)
3. Scroll down to **"Pages"** in the left sidebar
4. Click **"Pages"**

### 4.2 Configure GitHub Pages
1. Under **"Source"**, select **"GitHub Actions"**
2. You'll see a message about workflow files
3. The `.github/workflows/deploy.yml` file we created will handle deployment automatically

### 4.3 Trigger First Deployment
1. Go to **"Actions"** tab in your repository
2. You should see a workflow running called "Deploy Portfolio to GitHub Pages"
3. Wait for it to complete (green checkmark)

## Step 5: Access Your Live Website (1 minute)

### 5.1 Get Your Website URL
1. Go back to **Settings** → **Pages**
2. You'll see: **"Your site is published at https://YOUR_USERNAME.github.io/portfolio"**
3. Click the link to visit your live website!

### 5.2 Test Your Website
1. Check all sections load properly
2. Test responsive design on mobile
3. Try the contact form (it will log to console until you set up Google Sheets)

## Step 6: Set Up Google Sheets Contact Form (15 minutes)

### 6.1 Create Google Sheet
1. Go to https://sheets.google.com
2. Click **"Blank"** to create new sheet
3. Rename it to **"Portfolio Contacts"**
4. In row 1, add these headers:
   - A1: `Name`
   - B1: `Email`
   - C1: `Subject`
   - D1: `Message`
   - E1: `Timestamp`

### 6.2 Create Apps Script
1. In your sheet: **Extensions** → **Apps Script**
2. Delete the default code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var rowData = [];
    
    rowData[0] = e.parameter.name || '';
    rowData[1] = e.parameter.email || '';
    rowData[2] = e.parameter.subject || '';
    rowData[3] = e.parameter.message || '';
    rowData[4] = e.parameter.timestamp || new Date().toISOString();
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 6.3 Deploy Apps Script
1. Click **"Save"** (Ctrl+S)
2. Click **"Deploy"** → **"New deployment"**
3. Click the gear icon → **"Web app"**
4. Settings:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **"Deploy"**
6. **Copy the deployment URL** (very important!)

### 6.4 Update Your Contact Form
1. Go back to Replit
2. Open `client/src/components/Contact.tsx`
3. Find line with `googleSheetUrl`
4. Replace the placeholder URL with your actual deployment URL
5. Remove the console.log line

### 6.5 Rebuild and Deploy
```bash
# Build the updated code
npm run build

# Commit and push the changes
git add .
git commit -m "Added Google Sheets contact form integration"
git push origin main
```

## Step 7: Custom Domain (Optional - if you have student domain)

### 7.1 Add Custom Domain
1. GitHub repository → **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain (e.g., `abdulrasheed.dev`)
3. Check **"Enforce HTTPS"**
4. Click **"Save"**

### 7.2 Configure DNS
1. Go to your domain provider (Name.com, Namecheap, etc.)
2. Add these DNS records:
   - **Type**: A, **Name**: @, **Value**: `185.199.108.153`
   - **Type**: A, **Name**: @, **Value**: `185.199.109.153`
   - **Type**: A, **Name**: @, **Value**: `185.199.110.153`
   - **Type**: A, **Name**: @, **Value**: `185.199.111.153`
3. Wait 24 hours for DNS propagation

## Troubleshooting

### Build Fails
- Check **Actions** tab for error details
- Ensure all files are committed and pushed

### Contact Form Not Working
- Verify Google Apps Script URL is correct
- Check browser console for errors
- Test the Google Sheet manually

### 404 Error
- Wait 10 minutes after first deployment
- Check that GitHub Pages is enabled
- Verify files are in the right location

## Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed successfully  
- [ ] GitHub Actions workflow completed
- [ ] Website accessible at GitHub Pages URL
- [ ] Google Sheets contact form working
- [ ] All sections display correctly
- [ ] Mobile responsive design works
- [ ] Custom domain connected (if applicable)

Your portfolio is now live at: `https://YOUR_USERNAME.github.io/portfolio`

## Next Steps After Deployment

1. **Apply for GitHub Student Pack** for free domain
2. **Share your portfolio** on LinkedIn, resume, job applications
3. **Monitor contact form submissions** in Google Sheets
4. **Update content** as you learn new skills and complete projects

**Time to complete: 30 minutes total**