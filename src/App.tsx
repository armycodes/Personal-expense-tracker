import { useState, useEffect } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { SummaryStats } from './components/SummaryStats';
import { FilterBar } from './components/FilterBar';
import { ExpenseService } from './services/expenseService';
import { PDFService } from './services/pdfService';
import { Expense, ExpenseFilters } from './types/expense';
import { Wallet, Download, Upload } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    loadExpenses();
  }, [filters]);

  const loadExpenses = () => {
    const loadedExpenses = ExpenseService.getExpenses(filters);
    setExpenses(loadedExpenses);
  };

  const handleAddExpense = (
    amount: number,
    category: string,
    note: string,
    expenseDate: string
  ) => {
    try {
      ExpenseService.addExpense(amount, category, note, expenseDate);
      loadExpenses();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add expense');
    }
  };

  const handleUpdateExpense = (
    amount: number,
    category: string,
    note: string,
    expenseDate: string
  ) => {
    if (!editingExpense) return;

    try {
      ExpenseService.updateExpense(editingExpense.id, amount, category, note, expenseDate);
      setEditingExpense(null);
      loadExpenses();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update expense');
    }
  };

  const handleDeleteExpense = (id: string) => {
    try {
      ExpenseService.deleteExpense(id);
      loadExpenses();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete expense');
    }
  };

  const handleExport = () => {
    PDFService.generateExpensePDF(expenses, summary);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = event.target?.result as string;
        ExpenseService.importData(jsonData);
        loadExpenses();
        alert('Data imported successfully!');
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to import data');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const summary = ExpenseService.getSummary(filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Wallet size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-gray-600">Track and manage your personal expenses</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload size={18} />
                <span className="hidden sm:inline">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </header>

        <SummaryStats summary={summary} />

        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          onCancel={editingExpense ? () => setEditingExpense(null) : undefined}
          editingExpense={editingExpense}
        />

        <FilterBar filters={filters} onFilterChange={setFilters} />

        <ExpenseList
          expenses={expenses}
          onEdit={setEditingExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
}

export default App;
