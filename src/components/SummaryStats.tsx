import { ExpenseSummary } from '../types/expense';
import { DollarSign, TrendingUp, Hash, PieChart } from 'lucide-react';

interface SummaryStatsProps {
  summary: ExpenseSummary;
}

export function SummaryStats({ summary }: SummaryStatsProps) {
  const topCategories = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const recentMonths = Object.entries(summary.byMonth)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 3);

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Total Spent</span>
            <DollarSign size={20} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">
            ${summary.total.toFixed(2)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-800">Total Expenses</span>
            <Hash size={20} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-900">{summary.count}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-800">Average</span>
            <TrendingUp size={20} className="text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-900">
            ${summary.count > 0 ? (summary.total / summary.count).toFixed(2) : '0.00'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-800">Categories</span>
            <PieChart size={20} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {Object.keys(summary.byCategory).length}
          </div>
        </div>
      </div>

      {topCategories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Categories</h3>
          <div className="space-y-2">
            {topCategories.map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(amount / summary.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                    ${amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentMonths.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Months</h3>
          <div className="space-y-2">
            {recentMonths.map(([month, amount]) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{formatMonth(month)}</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
