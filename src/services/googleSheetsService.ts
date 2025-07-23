/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FamilyData {
  password: string;
  members: string[];
}

export interface FamilyDatabase {
  [phoneNumber: string]: FamilyData;
}

const SPREADSHEET_ID = '11HWTMy8m-9PnxMSPvPTck2C-9KSRvdGrp-2BryNiq3w';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;

/**
 * Fetches family data from Google Spreadsheet
 * Expected columns: Password, Card Holder Name, Family 1, Family 2, Family 3, Family 4, Family 5, Phone Number
 */
export const fetchFamilyData = async (): Promise<FamilyDatabase> => {
  try {
    const response = await fetch(CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheet data: ${response.status}`);
    }
    
    const csvText = await response.text();
    return parseCsvToFamilyData(csvText);
  } catch (error) {
    console.error('Error fetching family data from Google Sheets:', error);
    throw new Error('Unable to fetch family data. Please try again later.');
  }
};

/**
 * Parses CSV text into family database format
 */
const parseCsvToFamilyData = (csvText: string): FamilyDatabase => {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('Invalid spreadsheet format: No data rows found');
  }
  
  // Skip header row
  const dataRows = lines.slice(1);
  const familyDatabase: FamilyDatabase = {};
  
  dataRows.forEach((line, index) => {
    try {
      // Parse CSV line (handle quoted values)
      const columns = parseCsvLine(line);
      
      if (columns.length < 8) {
        console.warn(`Row ${index + 2}: Insufficient columns, skipping`);
        return;
      }
      
      const [password, cardHolderName, family1, family2, family3, family4, family5, phoneNumber] = columns;
      
      // Validate required fields
      if (!phoneNumber?.trim() || !password?.trim()) {
        console.warn(`Row ${index + 2}: Missing phone number or password, skipping`);
        return;
      }
      
      // Clean phone number (remove any non-digit characters except +)
      const cleanPhoneNumber = phoneNumber.trim().replace(/[^\d+]/g, '');
      
      // Collect family members (including card holder and non-empty family columns)
      const members: string[] = [];
      
      // Add card holder name if present
      if (cardHolderName?.trim()) {
        members.push(cardHolderName.trim());
      }
      
      // Add family members
      [family1, family2, family3, family4, family5].forEach(member => {
        if (member?.trim()) {
          members.push(member.trim());
        }
      });
      
      // Store in database using cleaned phone number
      familyDatabase[cleanPhoneNumber] = {
        password: password.trim(),
        members: members
      };
      
    } catch (error) {
      console.warn(`Row ${index + 2}: Error parsing row, skipping:`, error);
    }
  });
  
  return familyDatabase;
};

/**
 * Parses a single CSV line, handling quoted values and commas within quotes
 */
const parseCsvLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Handle escaped quotes
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current);
  
  return result;
};

/**
 * Validates login credentials against the fetched family data
 */
export const validateLogin = async (phone: string, password: string): Promise<{ success: boolean; familyData?: any; error?: string }> => {
  try {
    const familyDatabase = await fetchFamilyData();
    
    // Clean the input phone number to match the stored format
    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    const family = familyDatabase[cleanPhone];
    
    if (family && family.password === password) {
      return {
        success: true,
        familyData: { phone: cleanPhone, members: family.members }
      };
    } else {
      return {
        success: false,
        error: 'Invalid phone number or password'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login validation failed'
    };
  }
};