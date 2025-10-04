# Personal Expense Tracker

A modern, responsive web application for tracking and managing personal expenses with comprehensive reporting and filtering capabilities.

## Features

### Must-Have (Basic Functionality)
- **Add Expense**: Record expenses with amount, date, category, and optional notes
- **View Expenses**: Display all expenses in a clean, organized list
- **Update Expense**: Edit existing expense details
- **Delete Expense**: Remove expenses with confirmation
- **Data Persistence**: All data is saved to browser's local storage
- **Validation & Error Handling**: Comprehensive input validation and user-friendly error messages

### Good-to-Have (Optional Features)
- **Categories**: 8 predefined categories (food, travel, bills, shopping, entertainment, utilities, healthcare, other)
- **Summary Reports**:
  - Total amount spent
  - Number of expenses
  - Average expense amount
  - Spending grouped by category
  - Spending grouped by month
- **Filters**:
  - Filter by category
  - Filter by date range (start date and end date)
  - Search by text in notes or categories
- **PDF Export**: Download expense reports as PDF with summary statistics and detailed expense table
- **Data Import**: Import previously saved expense data from JSON files
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **jsPDF** with autoTable for PDF generation
- **Local Storage API** for data persistence

## How to Run

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Adding an Expense
1. Fill in the expense form at the top of the page
2. Enter the amount (required)
3. Select a category (required)
4. Choose the date (defaults to today)
5. Add an optional note/description
6. Click "Add Expense"

### Viewing Expenses
- All expenses are displayed in a list below the form
- Each expense shows: category badge, date, note, and amount
- Expenses are sorted by date (newest first)

### Editing an Expense
1. Click the pencil icon on any expense
2. The form will populate with the expense details
3. Modify the fields as needed
4. Click "Update Expense" to save changes
5. Click the X button to cancel editing

### Deleting an Expense
1. Click the trash icon on any expense
2. Confirm the deletion in the popup dialog

### Filtering Expenses
1. Click the "Filters" button to expand the filter panel
2. Use any combination of:
   - **Search**: Find expenses by text in notes or categories
   - **Category**: Filter by specific category
   - **Start Date**: Show expenses from this date onwards
   - **End Date**: Show expenses up to this date
3. Click "Clear All" to reset filters

### Using Summary Reports
- View key metrics at the top of the page:
  - **Total Spent**: Sum of all filtered expenses
  - **Total Expenses**: Count of filtered expenses
  - **Average**: Average expense amount
  - **Categories**: Number of unique categories used
- See top 3 spending categories with visual progress bars
- View spending for the last 3 months

### Exporting and Importing Data
- **Export to PDF**: Click the "Download" button to generate and download a comprehensive PDF report containing:
  - Summary statistics (total expenses, total amount, average)
  - Category breakdown table
  - Detailed expense list in tabular format with date, category, note, and amount
- **Import Data**: Click the "Import" button and select a previously exported JSON file to restore your expenses

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.tsx      # Form for adding/editing expenses
│   ├── ExpenseList.tsx      # Container for expense items
│   ├── ExpenseItem.tsx      # Individual expense display
│   ├── SummaryStats.tsx     # Summary statistics and reports
│   └── FilterBar.tsx        # Filtering controls
├── services/
│   ├── expenseService.ts    # Business logic and data management
│   └── pdfService.ts        # PDF generation and export
├── types/
│   ├── expense.ts           # TypeScript interfaces and types
│   └── jspdf-autotable.d.ts # Type definitions for jsPDF autoTable
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## Design Decisions & Assumptions

### Data Storage
- **Local Storage**: Chosen for simplicity and no server requirements
- **JSON Format**: Makes data easily exportable and portable
- **Client-Side Only**: No authentication needed, data stays on user's device

### User Experience
- **Single Page Application**: All features accessible without page reloads
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Visual Feedback**: Color-coded categories, hover states, and transitions
- **Confirmation Dialogs**: Prevents accidental deletions

### Data Model
- **UUID-based IDs**: Ensures unique identifiers for each expense
- **Timestamp Tracking**: Records when expenses are created and updated
- **Flexible Categories**: Predefined list with "other" as catch-all
- **Decimal Precision**: Supports cents with 2 decimal places

### Validation
- **Amount Validation**: Must be greater than 0
- **Required Fields**: Amount, category, and date are mandatory
- **Date Format**: Uses native date picker for consistency
- **Error Messages**: Clear, actionable feedback for users

## Sample Inputs/Outputs

### Adding an Expense
**Input:**
```
Amount: 45.50
Category: food
Date: 2025-10-04
Note: Lunch at cafe
```

**Output:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 45.50,
  "category": "food",
  "note": "Lunch at cafe",
  "expenseDate": "2025-10-04",
  "createdAt": "2025-10-04T12:30:00.000Z",
  "updatedAt": "2025-10-04T12:30:00.000Z"
}
```

### Summary Report Example
**Input:** 5 expenses totaling $250.00

**Output:**
```
Total Spent: $250.00
Total Expenses: 5
Average: $50.00
Categories: 3

Top Categories:
- food: $125.00 (50%)
- travel: $75.00 (30%)
- bills: $50.00 (20%)
```

### Filter Example
**Input:** Filter by category "food" between 2025-10-01 and 2025-10-31

**Output:** All food expenses from October 2025, sorted by date

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations & Future Enhancements

### Current Limitations
- Data stored only in browser (clearing cache removes data)
- No multi-device synchronization
- No recurring expenses
- No budget tracking or alerts

### Potential Enhancements
- Cloud storage with user authentication
- Recurring expense templates
- Budget goals and spending limits
- Charts and visualizations
- Receipt photo uploads
- Multi-currency support
- Tax category tagging
- Expense sharing for groups

## License

This project is open source and available for personal and educational use.

## Support

For issues, questions, or feature requests, please refer to the project repository.
