# Portfolio Deployment Guide

## Step 1: Google Sheets Setup for Contact Form

### Create Google Sheet
1. Go to https://sheets.google.com
2. Create new sheet named "Portfolio Contacts"
3. Add these column headers in row 1:
   - A1: Name
   - B1: Email  
   - C1: Subject
   - D1: Message
   - E1: Timestamp

### Create Google Apps Script
1. In your sheet: Extensions → Apps Script
2. Delete default code and paste this:

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
      .createTextOutput(JSON.stringify({result: 'success', message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script (Ctrl+S)
4. Deploy → New Deployment
5. Type: Web app
6. Execute as: Me  
7. Who has access: Anyone
8. Click Deploy
9. Copy the deployment URL (looks like: https://script.google.com/macros/s/LONG_ID/exec)

## Step 2: GitHub Student Pack Domain

1. Apply at: https://education.github.com/pack
2. Choose domain provider:
   - **Name.com**: Free .dev, .codes, .engineer domains
   - **Namecheap**: Free .me domain
   - **.TECH**: Free .tech domain

Recommended domains:
- abdulrasheed.dev
- talal.codes
- abdul-rasheed.me

## Step 3: Build & Deploy

1. Update contact form with your Google Script URL
2. Build the project: `npm run build`
3. Deploy to GitHub Pages or Netlify
4. Connect custom domain

## Step 4: DNS Setup

Point your domain to your hosting provider:
- **GitHub Pages**: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- **Netlify**: Automatically handled when you add domain in dashboard