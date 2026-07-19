import { Income } from '../types/income';
import { Expense } from '../types/expense';
import { Budget } from '../types/budget';

export interface CalculatedCategoryProgress {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentageUsed: number;
  month: string;
}

export const FinancialCalculations = {
  /**
   * Sum total income
   */
  calculateTotalIncome(incomes: Income[]): number {
    return incomes.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  },

  /**
   * Sum total expenses
   */
  calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  },

  /**
   * Net Balance = Total Income - Total Expenses
   */
  calculateTotalBalance(incomes: Income[], expenses: Expense[]): number {
    const totalInc = this.calculateTotalIncome(incomes);
    const totalExp = this.calculateTotalExpenses(expenses);
    return totalInc - totalExp;
  },

  /**
   * Net Savings = Net Balance
   */
  calculateNetSavings(incomes: Income[], expenses: Expense[]): number {
    return this.calculateTotalBalance(incomes, expenses);
  },

  /**
   * Group expenses by category and calculate budget progress per category limit
   */
  calculateBudgetProgress(budgets: Budget[], expenses: Expense[]): CalculatedCategoryProgress[] {
    // Map expenses spent per category
    const categorySpentMap: Record<string, number> = {};

    expenses.forEach((exp) => {
      const catName = exp.category_name || 'General Expense';
      categorySpentMap[catName] = (categorySpentMap[catName] || 0) + exp.amount;
    });

    return budgets.map((b) => {
      const catName = b.category_name || 'General Category';
      const spent = categorySpentMap[catName] || 0;
      const remaining = b.amount - spent;
      const percentageUsed = Math.min(Math.round((spent / (b.amount || 1)) * 100), 100);

      return {
        id: b.id,
        category: catName,
        budgetAmount: b.amount,
        spentAmount: spent,
        remainingAmount: remaining,
        percentageUsed,
        month: `${b.month}/${b.year}`,
      };
    });
  },
};
