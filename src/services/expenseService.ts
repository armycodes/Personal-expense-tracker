import { Expense, ExpenseFilters, ExpenseSummary } from '../types/expense';

const STORAGE_KEY = 'expense_tracker_data';

export class ExpenseService {
  private static getAllExpenses(): Expense[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  }

  private static saveAllExpenses(expenses: Expense[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
      throw new Error('Failed to save expense data');
    }
  }

  static getExpenses(filters?: ExpenseFilters): Expense[] {
    let expenses = this.getAllExpenses();

    if (!filters) {
      return expenses.sort(
        (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
      );
    }

    if (filters.category) {
      expenses = expenses.filter((e) => e.category === filters.category);
    }

    if (filters.startDate) {
      expenses = expenses.filter((e) => e.expenseDate >= filters.startDate!);
    }

    if (filters.endDate) {
      expenses = expenses.filter((e) => e.expenseDate <= filters.endDate!);
    }

    if (filters.searchText) {
      const search = filters.searchText.toLowerCase();
      expenses = expenses.filter(
        (e) =>
          e.note.toLowerCase().includes(search) ||
          e.category.toLowerCase().includes(search)
      );
    }

    return expenses.sort(
      (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
    );
  }

  static addExpense(
    amount: number,
    category: string,
    note: string,
    expenseDate: string
  ): Expense {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (!category) {
      throw new Error('Category is required');
    }

    const expenses = this.getAllExpenses();
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount,
      category,
      note: note || '',
      expenseDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    this.saveAllExpenses(expenses);
    return newExpense;
  }

  static updateExpense(
    id: string,
    amount: number,
    category: string,
    note: string,
    expenseDate: string
  ): Expense {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (!category) {
      throw new Error('Category is required');
    }

    const expenses = this.getAllExpenses();
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error('Expense not found');
    }

    expenses[index] = {
      ...expenses[index],
      amount,
      category,
      note: note || '',
      expenseDate,
      updatedAt: new Date().toISOString(),
    };

    this.saveAllExpenses(expenses);
    return expenses[index];
  }

  static deleteExpense(id: string): void {
    const expenses = this.getAllExpenses();
    const filtered = expenses.filter((e) => e.id !== id);

    if (filtered.length === expenses.length) {
      throw new Error('Expense not found');
    }

    this.saveAllExpenses(filtered);
  }

  static getSummary(filters?: ExpenseFilters): ExpenseSummary {
    const expenses = this.getExpenses(filters);

    const summary: ExpenseSummary = {
      total: 0,
      byCategory: {},
      byMonth: {},
      count: expenses.length,
    };

    expenses.forEach((expense) => {
      summary.total += expense.amount;

      if (!summary.byCategory[expense.category]) {
        summary.byCategory[expense.category] = 0;
      }
      summary.byCategory[expense.category] += expense.amount;

      const monthKey = expense.expenseDate.substring(0, 7);
      if (!summary.byMonth[monthKey]) {
        summary.byMonth[monthKey] = 0;
      }
      summary.byMonth[monthKey] += expense.amount;
    });

    return summary;
  }

  static exportData(): string {
    const expenses = this.getAllExpenses();
    return JSON.stringify(expenses, null, 2);
  }

  static importData(jsonData: string): void {
    try {
      const expenses = JSON.parse(jsonData);
      if (!Array.isArray(expenses)) {
        throw new Error('Invalid data format');
      }
      this.saveAllExpenses(expenses);
    } catch (error) {
      throw new Error('Failed to import data. Please check the file format.');
    }
  }
}
