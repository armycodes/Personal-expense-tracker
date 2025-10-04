import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Expense, ExpenseSummary } from '../types/expense';

export class PDFService {
  static generateExpensePDF(expenses: Expense[], summary: ExpenseSummary): void {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Expense Report', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, 14, 30);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Summary Statistics', 14, 42);

    doc.setFontSize(10);
    doc.text(`Total Expenses: ${summary.count}`, 14, 50);
    doc.text(`Total Amount: $${summary.total.toFixed(2)}`, 14, 57);
    doc.text(`Average Expense: $${summary.count > 0 ? (summary.total / summary.count).toFixed(2) : '0.00'}`, 14, 64);

    const categoryData = Object.entries(summary.byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount]) => [
        category.charAt(0).toUpperCase() + category.slice(1),
        `$${amount.toFixed(2)}`
      ]);

    if (categoryData.length > 0) {
      autoTable(doc, {
        startY: 72,
        head: [['Category', 'Amount']],
        body: categoryData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
        margin: { left: 14 },
        styles: { fontSize: 9 }
      });
    }

    const finalY = (doc as any).lastAutoTable?.finalY || 72;

    doc.setFontSize(12);
    doc.text('Expense Details', 14, finalY + 15);

    const expenseData = expenses.map((expense) => [
      new Date(expense.expenseDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      expense.category.charAt(0).toUpperCase() + expense.category.slice(1),
      expense.note || '-',
      `$${expense.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Date', 'Category', 'Note', 'Amount']],
      body: expenseData,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 80 },
        3: { cellWidth: 30, halign: 'right' }
      },
      styles: { fontSize: 9 },
      margin: { left: 14, right: 14 }
    });

    const fileName = `expenses-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }
}
