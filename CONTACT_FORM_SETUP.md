# Google Sheets Contact Form Setup

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named "Portfolio Contacts"
3. Set up columns in row 1:
   - **A1**: Name
   - **B1**: Email
   - **C1**: Subject
   - **D1**: Message
   - **E1**: Timestamp

## Step 2: Create Google Apps Script

1. In your sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var rowData = [];
    
    // Get form data
    rowData[0] = e.parameter.name || '';
    rowData[1] = e.parameter.email || '';
    rowData[2] = e.parameter.subject || '';
    rowData[3] = e.parameter.message || '';
    
    // Format timestamp for Pakistan (GMT+5)
    // Format: Wed, 02 - 2026, 3:00 PM
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "GMT+5", "EEE, dd - yyyy, h:mm a");
    rowData[4] = formattedDate;
    
    // Add row to sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success', 
        message: 'Message received successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click **Save** (Ctrl+S)
2. Click **Deploy** → **New Deployment**
3. Settings:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the deployment URL** (it looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update Your Portfolio

1. Open `client/src/components/Contact.tsx`
2. Find this line:
   ```typescript
   const googleSheetUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual deployment URL

## Step 5: Test the Form

1. Build and deploy your portfolio
2. Fill out the contact form
3. Check your Google Sheet - new entries should appear automatically!

## Security Note

The Google Apps Script is set to "Anyone" access, which is necessary for the contact form to work from your website. The script only accepts POST requests and only writes to your sheet - it cannot read or expose existing data.

## Troubleshooting

- **Form not submitting**: Check browser console for errors
- **No data in sheet**: Verify the Google Apps Script URL is correct
- **Permission denied**: Make sure the script is deployed with "Anyone" access