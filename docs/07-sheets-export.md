# Google Sheets Export - Documentation

Export GPU market data, pricing analysis, and scenarios to formatted Excel/Google Sheets files.

## 🎯 Overview

The Sheets Export feature allows users to download comprehensive market data in Excel format (.xlsx). Perfect for offline analysis, team sharing, and record keeping.

### Key Features
- **Multi-Sheet Workbooks** - Organized data across multiple sheets
- **Formatted Data** - Headers, colors, number formatting
- **3 Export Types** - Pricing data, market summary, scenario analysis
- **Instant Download** - No server processing required

---

## 🏗️ Architecture

### Flow Diagram
```
User Clicks Export → Generate Data → Format with SheetJS → Create .xlsx File → Browser Download
```

### Technology Stack

- **SheetJS (xlsx)** - Excel file generation library
- **Client-side Processing** - All done in browser
- **No Backend** - Direct download from frontend

---

## 💡 Export Types

### 1. Pricing Data Export 💰

**Contains 3 sheets:**

**Sheet 1: Current Pricing**
| GPU Model | Provider | Price ($/hr) | Monthly Cost | Region | Availability |
|-----------|----------|--------------|--------------|--------|--------------|
| H100      | Vast.ai  | 4.20         | 3,024        | US-West| High         |
| A100      | AWS      | 2.85         | 2,052        | US-East| Medium       |

**Sheet 2: Price History**
| Date       | GPU Model | Price | Change |
|------------|-----------|-------|--------|
| 2025-10-08 | H100      | 4.20  | +8.5%  |
| 2025-10-07 | H100      | 3.87  | -2.1%  |

**Sheet 3: Best Deals**
| GPU Model | Best Price | Provider | Savings vs Avg |
|-----------|------------|----------|----------------|
| H100      | 3.95       | Lambda   | 12%            |

### 2. Market Summary Export 📊

**Contains 2 sheets:**

**Sheet 1: Market Overview**
| Metric             | Value      |
|--------------------|------------|
| Market Temperature | 87/100     |
| Overall Trend      | Rising     |
| Volatility         | High       |

**Sheet 2: GPU Comparison**
| GPU   | Current | 7-Day Avg | 30-Day Avg | Trend |
|-------|---------|-----------|------------|-------|
| H100  | 4.20    | 4.05      | 3.92       | ↑     |

### 3. Scenario Analysis Export 🎯

**Contains 2 sheets:**

**Sheet 1: Scenario Results**
| Scenario Name       | Projected Impact | Confidence |
|---------------------|------------------|------------|
| H200 Early Release  | +28%             | 85%        |

**Sheet 2: Recommendations**
| Scenario            | Action           | Timeline  |
|---------------------|------------------|-----------|
| H200 Early Release  | Lock rates now   | Immediate |

---

## 🔧 Implementation Details

### Using SheetJS
```typescript
import * as XLSX from 'xlsx';

// Create workbook
const workbook = XLSX.utils.book_new();

// Create worksheet from data
const worksheet = XLSX.utils.json_to_sheet(data);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet Name');

// Generate file
const excelBuffer = XLSX.write(workbook, { 
  bookType: 'xlsx', 
  type: 'array' 
});

// Trigger download
const blob = new Blob([excelBuffer], { 
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
});
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'gpuwise-export.xlsx';
link.click();
```

### Data Formatting

**Headers:**
```typescript
const headers = {
  font: { bold: true, color: { rgb: "FFFFFF" } },
  fill: { fgColor: { rgb: "6B46C1" } }, // Purple
  alignment: { horizontal: "center" }
};
```

**Number Formatting:**
```typescript
// Currency
{ numFmt: "$#,##0.00" }

// Percentage
{ numFmt: "0.00%" }

// Date
{ numFmt: "yyyy-mm-dd" }
```

---

## 💻 Sample Data Structure

### Pricing Data
```typescript
interface PricingRow {
  gpu_model: string;
  provider: string;
  price_per_hour: number;
  monthly_cost: number;
  region: string;
  availability: string;
  last_updated: string;
}

const pricingData: PricingRow[] = [
  {
    gpu_model: 'H100',
    provider: 'Vast.ai',
    price_per_hour: 4.20,
    monthly_cost: 3024,
    region: 'US-West',
    availability: 'High',
    last_updated: '2025-10-08'
  },
  // ... more rows
];
```

---

## 🧪 Testing

### Test Cases

**Test 1: Pricing Export**
```
1. Click "Export Pricing Data"
2. ✅ File downloads (gpuwise-pricing-YYYY-MM-DD.xlsx)
3. Open in Excel/Sheets
4. ✅ 3 sheets present
5. ✅ Headers are bold and colored
6. ✅ Data is formatted correctly
7. ✅ Numbers show as currency
```

**Test 2: Market Summary Export**
```
1. Click "Export Market Summary"
2. ✅ File downloads
3. ✅ 2 sheets present
4. ✅ Data is current
```

**Test 3: Scenario Export**
```
1. Click "Export Scenario Analysis"
2. ✅ File downloads
3. ✅ Contains scenario results
```

**Test 4: Multiple Exports**
```
1. Export pricing
2. Export market summary
3. Export scenarios
4. ✅ 3 separate files downloaded
5. ✅ Each has unique timestamp
```

---

## 🎨 File Naming Convention
```
gpuwise-pricing-2025-10-08.xlsx
gpuwise-market-2025-10-08.xlsx
gpuwise-scenario-2025-10-08.xlsx
```

Format: `gpuwise-{type}-{YYYY-MM-DD}.xlsx`

---

## 🔐 Security & Privacy

### Client-Side Only
- All processing in browser
- No data sent to server
- No external API calls

### Data Sources
- Mock data for demo
- User's simulator results
- AI-generated scenarios

---

## ⚡ Performance

### File Size
- Typical export: 20-50 KB
- With history: 100-200 KB
- Very fast generation

### Browser Compatibility
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🐛 Troubleshooting

### Issue: File doesn't download
**Cause:** Browser blocking download
**Fix:** Allow pop-ups for the site

### Issue: File won't open
**Cause:** Corrupted file
**Fix:** Try export again, ensure SheetJS library loaded

### Issue: Formatting looks wrong
**Cause:** Opening in incompatible app
**Fix:** Use Excel, Google Sheets, or LibreOffice

---

## 🚀 Future Enhancements

### Planned Features

1. **Custom Columns**
   - User selects which fields to export
   - Reorder columns
   - Custom calculations

2. **Scheduled Exports**
   - Auto-export daily/weekly
   - Email delivery
   - Cloud storage upload

3. **CSV Format**
   - Simpler format option
   - Better for scripts
   - Smaller file size

4. **Charts in Excel**
   - Embedded price charts
   - Trend visualizations
   - Interactive graphs

5. **Template Library**
   - Pre-built export templates
   - Industry-specific formats
   - Custom branding

---

## 📊 Use Cases

### For CTOs
- Present to board/stakeholders
- Budget planning spreadsheets
- Historical price tracking

### For Procurement Teams
- Vendor comparison
- RFP preparation
- Contract negotiation data

### For Analysts
- Market research
- Trend analysis
- Forecasting models

---

## 📚 Related Documentation

- [Simulator](02-simulator.md) - Export simulator results
- [Scenarios](08-scenarios.md) - Export scenario analysis
- [Zapier](06-zapier-integration.md) - Auto-export to Sheets

---

## 🔗 External Resources

- [SheetJS Documentation](https://docs.sheetjs.com/)
- [Excel File Format](https://support.microsoft.com/en-us/office/file-formats-supported-in-excel)

---

**Next:** [Scenario Studio →](08-scenarios.md)
