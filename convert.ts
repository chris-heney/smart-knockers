import * as fs from 'fs';
import * as path from 'path';
import * as fastcsv from 'fast-csv';

// Define the record structure
interface Record {
  address: string;
  phase: string;
}

// Extract the street name from the address
function extractStreetName(address: string): string {
  const match = address.match(/^\d+\s+(.*)/);
  return match ? match[1] : address; // Return the street name after the house number
}

// Extract the house number (leading number) from the address
function extractHouseNumber(address: string): number {
  const match = address.match(/^(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
}

// Sort the records by phase, street name, and house number
function sortRecords(records: Record[]): Record[] {
  return records.sort((a, b) => {
    // Compare by phase first
    const phaseComparison = a.phase.localeCompare(b.phase, undefined, { numeric: true });

    if (phaseComparison === 0) {
      // If phases are the same, compare by street name
      const streetA = extractStreetName(a.address);
      const streetB = extractStreetName(b.address);
      const streetComparison = streetA.localeCompare(streetB);

      if (streetComparison === 0) {
        // If street names are the same, compare by house number
        const houseNumberA = extractHouseNumber(a.address);
        const houseNumberB = extractHouseNumber(b.address);
        return houseNumberA - houseNumberB;
      }

      return streetComparison;
    }

    return phaseComparison;
  });
}

// Process a single CSV file
function processCsv(filePath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: Record[] = [];

    // Read CSV
    fs.createReadStream(filePath)
      .pipe(fastcsv.parse({ headers: ['address', 'phase'] }))
      .on('data', (row: Record) => {
        if (row.address && row.phase) {
          records.push(row);
        }
      })
      .on('end', () => {
        // Sort the records by phase, street name, and house number
        const sortedRecords = sortRecords(records);

        // Write to the output file
        const writeStream = fs.createWriteStream(outputPath);
        fastcsv.write(sortedRecords, { headers: true }).pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      })
      .on('error', reject);
  });
}

// Main function to process all CSV files in the input directory
async function processAllCsvFiles(): Promise<void> {
  const inputDir = path.join(__dirname, 'input');
  const outputDir = path.join(__dirname, 'output');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Process each CSV file in the input directory
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.csv'));
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    console.log(`Processing ${file}...`);
    await processCsv(inputPath, outputPath);
    console.log(`${file} has been processed and saved to ${outputPath}`);
  }
}

// Run the script
processAllCsvFiles()
  .then(() => console.log('All files have been processed.'))
  .catch(err => console.error('Error processing files:', err));
