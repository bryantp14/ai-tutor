import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import * as fs from 'fs';
import * as path from 'path';

// This looks for 'service-account.json' in your main folder
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'service-account.json');

export async function appendToSheet(userData: any) {
  try {
    // 1. Check if the key file exists
    if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
      console.error("❌ ERROR: service-account.json not found! Did you drag it to the main folder?");
      return;
    }

    // 2. Authenticate
    const rawData = fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8');
    const serviceAccount = JSON.parse(rawData);

    const serviceAccountAuth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 3. Load the Sheet
    // It grabs the ID from your .env file
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth);
    await doc.loadInfo();

    // 4. Select the first tab
    const sheet = doc.sheetsByIndex[0];

    // 5. Add the Row
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      Unit: userData.unit || "Unknown",
      User_Message: userData.userMessage,
      AI_Response: userData.aiResponse,
    });

    console.log("✅ Logged to Google Sheet!");

  } catch (error) {
    console.error("❌ Google Sheets Error:", error);
  }
}