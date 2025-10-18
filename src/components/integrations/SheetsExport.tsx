/**
 * SheetsExport Component
 * UI for exporting data to Excel/Google Sheets
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { exportToExcel, ExportType } from '@/lib/integrations/sheets';
import { toast } from 'sonner';
import { Download, FileSpreadsheet, Loader2, CheckCircle } from 'lucide-react';

const SheetsExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (exportType: ExportType) => {
    setIsExporting(true);

    try {
      exportToExcel(exportType);
      
      toast.success('✅ File downloaded! Check your Downloads folder.', {
        description: `gpuwise-${exportType}-${new Date().toISOString().split('T')[0]}.xlsx`,
      });
    } catch (error: any) {
      toast.error('Failed to export file. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#0F9D58] flex items-center justify-center">
            <FileSpreadsheet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Google Sheets Export
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ✅ LIVE
              </Badge>
            </h3>
            <p className="text-sm text-gray-600">
              Export pricing data and scenarios to Excel
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-800">
          <strong>Features:</strong> Multi-sheet exports • Formatted data • Instant download • No setup required
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium">📥 Available Exports</h4>

        {/* Pricing Export */}
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h5 className="font-semibold flex items-center gap-2">
                💰 Pricing Data
                <Badge variant="outline" className="text-xs">3 sheets</Badge>
              </h5>
              <p className="text-sm text-gray-600 mt-1">
                Current GPU prices, historical data, and best deals across providers
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3 rounded mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span><strong>Sheet 1:</strong> Current pricing for H100, A100, L40S</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span><strong>Sheet 2:</strong> 7-day price history with changes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span><strong>Sheet 3:</strong> Best deals and savings comparison</span>
            </div>
          </div>

          <Button
            onClick={() => handleExport('pricing')}
            disabled={isExporting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download Pricing Data
          </Button>
        </div>

        {/* Market Summary Export */}
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h5 className="font-semibold flex items-center gap-2">
                📊 Market Summary
                <Badge variant="outline" className="text-xs">2 sheets</Badge>
              </h5>
              <p className="text-sm text-gray-600 mt-1">
                Market temperature, trends, and comprehensive GPU comparison
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3 rounded mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-blue-600" />
              <span><strong>Sheet 1:</strong> Market overview and key metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-blue-600" />
              <span><strong>Sheet 2:</strong> GPU comparison with trend analysis</span>
            </div>
          </div>

          <Button
            onClick={() => handleExport('market')}
            disabled={isExporting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download Market Summary
          </Button>
        </div>

        {/* Scenario Export */}
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h5 className="font-semibold flex items-center gap-2">
                🎯 Scenario Analysis
                <Badge variant="outline" className="text-xs">2 sheets</Badge>
              </h5>
              <p className="text-sm text-gray-600 mt-1">
                What-if scenarios with projections and actionable recommendations
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3 rounded mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-purple-600" />
              <span><strong>Sheet 1:</strong> Scenario results with confidence scores</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-purple-600" />
              <span><strong>Sheet 2:</strong> Strategic recommendations and timelines</span>
            </div>
          </div>

          <Button
            onClick={() => handleExport('scenario')}
            disabled={isExporting}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download Scenario Analysis
          </Button>
        </div>
      </div>

      {/* File Format Info */}
      <div className="mb-6 space-y-3">
        <h4 className="font-medium text-sm">📄 File Format</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold mb-1">Format</div>
            <div className="text-gray-600">.xlsx (Excel)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold mb-1">Compatible With</div>
            <div className="text-gray-600">Excel, Google Sheets, LibreOffice</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold mb-1">File Size</div>
            <div className="text-gray-600">~20-50 KB</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold mb-1">Processing</div>
            <div className="text-gray-600">Client-side only</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3">💡 Common Use Cases</h4>
        <div className="space-y-2 text-xs text-gray-700">
          <div className="flex items-start gap-2">
            <span>📊</span>
            <div>
              <strong>Budget Planning:</strong> Export pricing data for quarterly planning spreadsheets
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>📈</span>
            <div>
              <strong>Trend Analysis:</strong> Track price changes over time in your own models
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>👥</span>
            <div>
              <strong>Team Sharing:</strong> Share market summaries with stakeholders via email
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>📝</span>
            <div>
              <strong>Documentation:</strong> Archive scenario analysis for future reference
            </div>
          </div>
        </div>
      </div>

      {/* Upload to Google Sheets */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-sm text-green-900 mb-2">
          📤 Upload to Google Sheets
        </h4>
        <ol className="text-xs text-green-800 space-y-1 ml-4 list-decimal">
          <li>Click any Download button above</li>
          <li>Go to Google Sheets (sheets.google.com)</li>
          <li>Click File → Import → Upload → Select the .xlsx file</li>
          <li>Choose "Replace spreadsheet" or "Insert new sheet(s)"</li>
          <li>Data is now in Google Sheets for collaboration!</li>
        </ol>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          🔒 <strong>Privacy:</strong> All exports are generated in your browser. 
          No data is sent to our servers. Files download directly to your device.
        </p>
      </div>
    </Card>
  );
};

export default SheetsExport;
