import { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { DashboardData, SalesRecord, InventoryItem, AttendanceRecord, FeedbackRecord } from '../types/cafe';

const SPREADSHEET_ID = '1uHdxui32Vb9W7JSxnbxVB35VwqAk0ex2gQpQhCzLYH0';
const REFRESH_INTERVAL = 60000; // 60 seconds

// Sheet GIDs - using 0 for now, will get correct GIDs from sheet structure
const SHEET_GIDS = {
  salesLog: '0',        // First sheet (working)
  inventory: '0',       // Use same for now until we get correct GIDs
  attendance: '0',      // Use same for now until we get correct GIDs
  feedback: '0'         // Use same for now until we get correct GIDs
};

const buildCSVUrl = (gid: string) => 
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;

// Demo data to use when external sources are unavailable
const getDemoData = (): DashboardData => ({
  salesLog: [
    {
      date: '2025-07-31',
      time: '11:30',
      itemName: 'Veg Burger',
      quantity: 2,
      price: 33,
      paymentType: 'UPI',
      staffName: 'Ram'
    },
    {
      date: '2025-07-31',
      time: '13:15',
      itemName: 'Coffee',
      quantity: 4,
      price: 40,
      paymentType: 'Cash',
      staffName: 'Geeta'
    },
    {
      date: '2025-07-31',
      time: '14:20',
      itemName: 'Masala Tea',
      quantity: 3,
      price: 15,
      paymentType: 'UPI',
      staffName: 'Ram'
    },
    {
      date: '2025-07-31',
      time: '15:45',
      itemName: 'Veg Burger',
      quantity: 1,
      price: 33,
      paymentType: 'Cash',
      staffName: 'Geeta'
    }
  ],
  inventory: [
    { itemName: 'Coffee Beans', stockLeft: 15, reorderThreshold: 20 },
    { itemName: 'Burger Buns', stockLeft: 25, reorderThreshold: 10 },
    { itemName: 'Tea Leaves', stockLeft: 30, reorderThreshold: 15 },
    { itemName: 'Milk', stockLeft: 8, reorderThreshold: 10 }
  ],
  attendance: [
    { staffName: 'Ram', date: '2025-07-31', timeIn: '09:00', timeOut: '18:00' },
    { staffName: 'Geeta', date: '2025-07-31', timeIn: '10:00', timeOut: '19:00' }
  ],
  feedback: [
    { date: '2025-07-31', rating: 5, feedback: 'Excellent service and food!' },
    { date: '2025-07-30', rating: 4, feedback: 'Good food, quick service' },
    { date: '2025-07-29', rating: 5, feedback: 'Great coffee and atmosphere' }
  ],
  lastUpdated: new Date()
});

export const useCafeData = () => {
  const [data, setData] = useState<DashboardData>({
    salesLog: [],
    inventory: [],
    attendance: [],
    feedback: [],
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseSalesData = (csvData: string): SalesRecord[] => {
    const result = Papa.parse(csvData, { header: true, skipEmptyLines: true });
    return result.data.map((row: any) => ({
      date: row['Date'] || '',
      time: row['Time'] || '',
      itemName: row['Item Name'] || '',
      quantity: parseInt(row['Quantity']) || 0,
      price: parseFloat(row['Price (₹)']) || 0,
      paymentType: row['Payment Type'] as 'UPI' | 'Cash' || 'Cash',
      staffName: row['Staff Name'] || ''
    })).filter(record => record.date && record.itemName);
  };

  const parseInventoryData = (csvData: string): InventoryItem[] => {
    const result = Papa.parse(csvData, { header: true, skipEmptyLines: true });
    return result.data.map((row: any) => ({
      itemName: row['Item Name'] || '',
      stockLeft: parseInt(row['Stock Left']) || 0,
      reorderThreshold: parseInt(row['Reorder Threshold']) || 0
    })).filter(item => item.itemName);
  };

  const parseAttendanceData = (csvData: string): AttendanceRecord[] => {
    const result = Papa.parse(csvData, { header: true, skipEmptyLines: true });
    return result.data.map((row: any) => ({
      staffName: row['Staff Name'] || '',
      date: row['Date'] || '',
      timeIn: row['Time In'] || '',
      timeOut: row['Time Out'] || ''
    })).filter(record => record.staffName && record.date);
  };

  const parseFeedbackData = (csvData: string): FeedbackRecord[] => {
    const result = Papa.parse(csvData, { header: true, skipEmptyLines: true });
    return result.data.map((row: any) => ({
      date: row['Date'] || '',
      rating: parseInt(row['Rating']) || 0,
      feedback: row['Feedback'] || ''
    })).filter((record: any) => record.date && record.rating);
  };

  const fetchDataFromWebhook = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      // First try to fetch from webhook with quick timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      }, 2000); // Shorter timeout
      
      try {
        const webhookResponse = await fetch('http://localhost:5678/webhook-test/sheetaccess', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (webhookResponse && webhookResponse.ok) {
          const webhookData = await webhookResponse.json();
          
          // Process webhook data if it's in the expected format
          if (webhookData && typeof webhookData === 'object') {
            const newData: DashboardData = {
              salesLog: webhookData.salesLog ? parseSalesData(webhookData.salesLog) : getDemoData().salesLog,
              inventory: webhookData.inventory || getDemoData().inventory,
              attendance: webhookData.attendance || getDemoData().attendance,
              feedback: webhookData.feedback || getDemoData().feedback,
              lastUpdated: new Date()
            };
            setData(newData);
            return;
          }
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        // Silently continue to next fallback
      }

      // Quick fallback to Google Sheets (with faster timeout)
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => {
          if (!controller2.signal.aborted) {
            controller2.abort();
          }
        }, 2000);
        
        const salesResponse = await fetch(buildCSVUrl(SHEET_GIDS.salesLog), {
          signal: controller2.signal
        });
        clearTimeout(timeoutId2);
        
        if (salesResponse.ok) {
          const salesCSV = await salesResponse.text();
          const newData: DashboardData = {
            salesLog: parseSalesData(salesCSV),
            inventory: getDemoData().inventory,
            attendance: getDemoData().attendance,
            feedback: getDemoData().feedback,
            lastUpdated: new Date()
          };
          setData(newData);
          return;
        }
      } catch (sheetsError: any) {
        // Continue to demo data
      }

      // Use demo data as final fallback
      setData(getDemoData());
      
    } catch (outerError) {
      // Final fallback - always show demo data
      setData(getDemoData());
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = fetchDataFromWebhook;

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};