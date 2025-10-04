import { Expense } from '../types/expense';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  food: 'bg-orange-100 text-orange-800',
  travel: 'bg-blue-100 text-blue-800',
  bills: 'bg-red-100 text-red-800',
  shopping: 'bg-green-100 text-green-800',
  entertainment: 'bg-pink-100 text-pink-800',
  utilities: 'bg-yellow-100 text-yellow-800',
  healthcare: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.other
              }`}
            >
              {expense.category}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              {formatDate(expense.expenseDate)}
            </span>
          </div>

          {expense.note && (
            <p className="text-sm text-gray-700 mb-2 break-words">{expense.note}</p>
          )}

          <div className="text-2xl font-bold text-gray-900">
            ${expense.amount.toFixed(2)}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit expense"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete expense"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
