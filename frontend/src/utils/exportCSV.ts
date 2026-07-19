import { Income } from '../types/income';
import { Expense } from '../types/expense';

export function exportTransactionsToCSV(incomes: Income[], expenses: Expense[], filename = 'financial_statement.csv') {
  const headers = ['ID', 'Type', 'Category', 'Description', 'Amount', 'Date'];

  const incomeRows = incomes.map((i) => [
    i.id,
    'Income',
    `"${i.category_name || 'General Income'}"`,
    `"${i.description || ''}"`,
    i.amount,
    i.transaction_date,
  ]);

  const expenseRows = expenses.map((e) => [
    e.id,
    'Expense',
    `"${e.category_name || 'General Expense'}"`,
    `"${e.description || ''}"`,
    e.amount,
    e.transaction_date,
  ]);

  const allRows = [headers, ...incomeRows, ...expenseRows];
  const csvContent = 'data:text/csv;charset=utf-8,' + allRows.map((r) => r.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
