export interface Expense {
  id: string;
  amount: number;
  category: string;
  note: string;
  expenseDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryType =
  | 'food'
  | 'travel'
  | 'bills'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'healthcare'
  | 'other';

export const CATEGORIES: CategoryType[] = [
  'food',
  'travel',
  'bills',
  'shopping',
  'entertainment',
  'utilities',
  'healthcare',
  'other',
];

export interface ExpenseFilters {
  category?: string;
  startDate?: string;
  endDate?: string;
  searchText?: string;
}

export interface ExpenseSummary {
  total: number;
  byCategory: Record<string, number>;
  byMonth: Record<string, number>;
  count: number;
}
