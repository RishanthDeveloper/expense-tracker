import { Income } from '../types/income';
import { Expense } from '../types/expense';
import { formatCurrency } from './formatters';

export function exportFinancialReportPDF(
  incomes: Income[],
  expenses: Expense[],
  filename = 'financial_statement_summary.pdf'
) {
  const totalInc = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExp = expenses.reduce((a, b) => a + b.amount, 0);
  const netSave = totalInc - totalExp;

  // Generate HTML print view for PDF save
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate the PDF statement.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #1e293b; }
          h1 { color: #059669; font-size: 24px; }
          .metrics { display: flex; gap: 16px; margin: 20px 0; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; flex: 1; }
          .card-title { font-size: 11px; color: #64748b; font-weight: bold; }
          .card-val { font-size: 20px; font-weight: bold; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          th { background: #f1f5f9; }
          .income { color: #059669; font-weight: bold; }
          .expense { color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Expense Tracker AI - Financial Statement Report (INR ₹)</h1>
        <p style="font-size: 12px; color: #64748b;">Generated on: ${new Date().toLocaleDateString()}</p>
        
        <div class="metrics">
          <div class="card">
            <div class="card-title">TOTAL INCOME</div>
            <div class="card-val income">${formatCurrency(totalInc)}</div>
          </div>
          <div class="card">
            <div class="card-title">TOTAL EXPENSES</div>
            <div class="card-val expense">${formatCurrency(totalExp)}</div>
          </div>
          <div class="card">
            <div class="card-title">NET SAVINGS</div>
            <div class="card-val">${formatCurrency(netSave)}</div>
          </div>
        </div>

        <h3>Transaction Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th style="text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${incomes.map(i => `
              <tr>
                <td class="income">Income</td>
                <td>${i.category_name || 'General Income'}</td>
                <td>${i.description || '-'}</td>
                <td>${i.transaction_date}</td>
                <td style="text-align: right;" class="income">+${formatCurrency(i.amount)}</td>
              </tr>
            `).join('')}
            ${expenses.map(e => `
              <tr>
                <td class="expense">Expense</td>
                <td>${e.category_name || 'General Expense'}</td>
                <td>${e.description || '-'}</td>
                <td>${e.transaction_date}</td>
                <td style="text-align: right;" class="expense">-${formatCurrency(e.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
