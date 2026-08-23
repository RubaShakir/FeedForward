import Papa from 'papaparse';

export const CSV_DONATIONS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRUapgWQTl802htiX2F_mPkiLX0OQafGZ0ltXKcloCiW2QZ2QlaXKjkiTR4-Xp-aRujAoAOzIZ8yW56/pub?gid=1738836092&single=true&output=csv';

export async function fetchDonationsCSV(url = CSV_DONATIONS_URL) {
  // Append timestamp to bypass aggressive browser caching on refresh
  const cacheBuster = `${url.includes('?') ? '&' : '?'}_t=${Date.now()}`;
  const response = await fetch(url + cacheBuster);

  if (!response.ok) {
    throw new Error(`Failed to fetch CSV data: ${response.status} ${response.statusText}`);
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: false,
      skipEmptyLines: 'greedy',
      complete: (results) => {
        try {
          const rows = results.data;
          if (!rows || rows.length <= 1) {
            resolve([]);
            return;
          }

          // Header row is index 0
          // Columns: Timestamp, Donor Name, Item Name, Quantity, Expiry Date, Pickup window, Rough Location, Contact
          const dataRows = rows.slice(1);

          const parsedDonations = dataRows
            .filter((row) => row.some((cell) => cell && String(cell).trim().length > 0))
            .map((row, index) => {
              const timestamp = row[0] ? String(row[0]).trim() : '';
              const donorName = row[1] ? String(row[1]).trim() : 'Anonymous Donor';
              const itemName = row[2] ? String(row[2]).trim() : 'Food Item';
              const quantity = row[3] ? String(row[3]).trim() : '1 unit';
              const expiryDate = row[4] ? String(row[4]).trim() : '';
              const pickupWindow = row[5] ? String(row[5]).trim() : 'Flexible / Contact Donor';
              const location = row[6] ? String(row[6]).trim() : 'Location not specified';
              const contact = row[7] ? String(row[7]).trim() : 'Not provided';

              return {
                id: `donation-${index}-${timestamp || Date.now()}`,
                timestamp,
                donorName,
                itemName,
                quantity,
                expiryDate,
                pickupWindow,
                location,
                contact,
              };
            });

          resolve(parsedDonations);
        } catch (err) {
          reject(err);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
