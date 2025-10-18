/**
 * Google Sheets Export Logic
 * Handles Excel file generation and download
 */

import * as XLSX from 'xlsx';

export type ExportType = 'pricing' | 'market' | 'scenario';

/**
 * Generate pricing data
 */
const generatePricingData = () => {
  const currentPricing = [
    {
      'GPU Model': 'H100',
      'Provider': 'Vast.ai',
      'Price ($/hr)': 4.20,
      'Monthly Cost': 3024,
      'Region': 'US-West',
      'Availability': 'High',
      'Last Updated': new Date().toLocaleDateString(),
    },
    {
      'GPU Model': 'H100',
      'Provider': 'AWS',
      'Price ($/hr)': 4.85,
      'Monthly Cost': 3492,
      'Region': 'US-East',
      'Availability': 'Medium',
      'Last Updated': new Date().toLocaleDateString(),
    },
    {
      'GPU Model': 'A100',
      'Provider': 'GCP',
      'Price ($/hr)': 2.85,
      'Monthly Cost': 2052,
      'Region': 'US-Central',
      'Availability': 'High',
      'Last Updated': new Date().toLocaleDateString(),
    },
    {
      'GPU Model': 'A100',
      'Provider': 'Lambda Labs',
      'Price ($/hr)': 2.45,
      'Monthly Cost': 1764,
      'Region': 'US-West',
      'Availability': 'Low',
      'Last Updated': new Date().toLocaleDateString(),
    },
    {
      'GPU Model': 'L40S',
      'Provider': 'Azure',
      'Price ($/hr)': 1.95,
      'Monthly Cost': 1404,
      'Region': 'EU-West',
      'Availability': 'High',
      'Last Updated': new Date().toLocaleDateString(),
    },
  ];

  const priceHistory = [
    { 'Date': '2025-10-08', 'GPU Model': 'H100', 'Price': 4.20, 'Change': '+8.5%' },
    { 'Date': '2025-10-07', 'GPU Model': 'H100', 'Price': 3.87, 'Change': '-2.1%' },
    { 'Date': '2025-10-06', 'GPU Model': 'H100', 'Price': 3.95, 'Change': '+1.5%' },
    { 'Date': '2025-10-08', 'GPU Model': 'A100', 'Price': 2.85, 'Change': '-3.2%' },
    { 'Date': '2025-10-07', 'GPU Model': 'A100', 'Price': 2.94, 'Change': '+0.7%' },
  ];

  const bestDeals = [
    {
      'GPU Model': 'H100',
      'Best Price ($/hr)': 3.95,
      'Provider': 'Lambda Labs',
      'Savings vs Avg': '12%',
      'Region': 'US-West',
    },
    {
      'GPU Model': 'A100',
      'Best Price ($/hr)': 2.45,
      'Provider': 'Lambda Labs',
      'Savings vs Avg': '15%',
      'Region': 'US-West',
    },
    {
      'GPU Model': 'L40S',
      'Best Price ($/hr)': 1.75,
      'Provider': 'Vast.ai',
      'Savings vs Avg': '10%',
      'Region': 'EU-Central',
    },
  ];

  return { currentPricing, priceHistory, bestDeals };
};

/**
 * Generate market summary data
 */
const generateMarketData = () => {
  const overview = [
    { 'Metric': 'Market Temperature', 'Value': '87/100' },
    { 'Metric': 'Overall Trend', 'Value': 'Rising' },
    { 'Metric': 'Volatility', 'Value': 'High' },
    { 'Metric': 'Supply Level', 'Value': 'Tight' },
    { 'Metric': 'Demand Outlook', 'Value': 'Strong' },
  ];

  const comparison = [
    {
      'GPU Model': 'H100',
      'Current ($/hr)': 4.20,
      '7-Day Avg': 4.05,
      '30-Day Avg': 3.92,
      'Trend': '↑ Rising',
    },
    {
      'GPU Model': 'A100',
      'Current ($/hr)': 2.85,
      '7-Day Avg': 2.94,
      '30-Day Avg': 2.98,
      'Trend': '↓ Falling',
    },
    {
      'GPU Model': 'L40S',
      'Current ($/hr)': 1.95,
      '7-Day Avg': 1.93,
      '30-Day Avg': 1.91,
      'Trend': '→ Stable',
    },
  ];

  return { overview, comparison };
};

/**
 * Generate scenario data
 */
const generateScenarioData = () => {
  const results = [
    {
      'Scenario Name': 'H200 Early Release',
      'Projected Impact': '+28% price increase',
      'Confidence': '85%',
      'Timeline': '2-4 weeks',
      'Probability': 'High',
    },
    {
      'Scenario Name': 'Supply Chain Disruption',
      'Projected Impact': '+45% price spike',
      'Confidence': '72%',
      'Timeline': '1-2 weeks',
      'Probability': 'Medium',
    },
    {
      'Scenario Name': 'New Hyperscaler Capacity',
      'Projected Impact': '-15% price decrease',
      'Confidence': '90%',
      'Timeline': '4-6 weeks',
      'Probability': 'High',
    },
  ];

  const recommendations = [
    {
      'Scenario': 'H200 Early Release',
      'Action': 'Lock H100 rates immediately',
      'Timeline': 'This week',
      'Risk Level': 'Medium',
    },
    {
      'Scenario': 'Supply Chain Disruption',
      'Action': 'Secure capacity now, expect volatility',
      'Timeline': 'Immediate',
      'Risk Level': 'High',
    },
    {
      'Scenario': 'New Hyperscaler Capacity',
      'Action': 'Wait 3-4 weeks for better pricing',
      'Timeline': '3-4 weeks',
      'Risk Level': 'Low',
    },
  ];

  return { results, recommendations };
};

/**
 * Create and download Excel file
 */
export const exportToExcel = (exportType: ExportType): void => {
  try {
    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Generate data based on type
    if (exportType === 'pricing') {
      const { currentPricing, priceHistory, bestDeals } = generatePricingData();

      // Add sheets
      const ws1 = XLSX.utils.json_to_sheet(currentPricing);
      const ws2 = XLSX.utils.json_to_sheet(priceHistory);
      const ws3 = XLSX.utils.json_to_sheet(bestDeals);

      XLSX.utils.book_append_sheet(workbook, ws1, 'Current Pricing');
      XLSX.utils.book_append_sheet(workbook, ws2, 'Price History');
      XLSX.utils.book_append_sheet(workbook, ws3, 'Best Deals');
    } else if (exportType === 'market') {
      const { overview, comparison } = generateMarketData();

      const ws1 = XLSX.utils.json_to_sheet(overview);
      const ws2 = XLSX.utils.json_to_sheet(comparison);

      XLSX.utils.book_append_sheet(workbook, ws1, 'Market Overview');
      XLSX.utils.book_append_sheet(workbook, ws2, 'GPU Comparison');
    } else if (exportType === 'scenario') {
      const { results, recommendations } = generateScenarioData();

      const ws1 = XLSX.utils.json_to_sheet(results);
      const ws2 = XLSX.utils.json_to_sheet(recommendations);

      XLSX.utils.book_append_sheet(workbook, ws1, 'Scenario Results');
      XLSX.utils.book_append_sheet(workbook, ws2, 'Recommendations');
    }

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create blob and download
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gpuwise-${exportType}-${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export file');
  }
};
