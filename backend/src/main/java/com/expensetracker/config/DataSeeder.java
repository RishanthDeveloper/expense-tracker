package com.expensetracker.config;

import com.expensetracker.model.Budget;
import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    public DataSeeder(ExpenseRepository expenseRepository, BudgetRepository budgetRepository) {
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
    }

    @Override
    public void run(String... args) {
        if (expenseRepository.count() > 0) {
            return;
        }

        seedExpenses();
        seedBudgets();
    }

    private void seedExpenses() {
        LocalDate today = LocalDate.now();

        List<Expense> expenses = List.of(
                // Current month expenses
                Expense.builder().title("Grocery shopping at Whole Foods").amount(85.50).category(Category.FOOD).date(today.minusDays(1)).notes("Weekly groceries").build(),
                Expense.builder().title("Lunch at Chipotle").amount(14.25).category(Category.FOOD).date(today.minusDays(3)).notes("Burrito bowl").build(),
                Expense.builder().title("Coffee at Starbucks").amount(6.75).category(Category.FOOD).date(today.minusDays(5)).build(),
                Expense.builder().title("Uber ride to office").amount(22.00).category(Category.TRANSPORT).date(today.minusDays(2)).notes("Morning commute").build(),
                Expense.builder().title("Gas station fill-up").amount(55.00).category(Category.TRANSPORT).date(today.minusDays(7)).build(),
                Expense.builder().title("Amazon order - headphones").amount(79.99).category(Category.SHOPPING).date(today.minusDays(4)).notes("Sony WH-1000XM5").build(),
                Expense.builder().title("Nike running shoes").amount(129.99).category(Category.SHOPPING).date(today.minusDays(10)).build(),
                Expense.builder().title("Netflix subscription").amount(15.99).category(Category.ENTERTAINMENT).date(today.minusDays(6)).notes("Monthly subscription").build(),
                Expense.builder().title("Movie tickets").amount(28.00).category(Category.ENTERTAINMENT).date(today.minusDays(8)).notes("2 tickets for new release").build(),
                Expense.builder().title("Electric bill").amount(120.00).category(Category.BILLS).date(today.minusDays(5)).notes("July electricity").build(),
                Expense.builder().title("Internet bill").amount(59.99).category(Category.BILLS).date(today.minusDays(9)).build(),
                Expense.builder().title("Gym membership").amount(45.00).category(Category.HEALTH).date(today.minusDays(3)).notes("Monthly gym fee").build(),
                Expense.builder().title("Pharmacy - vitamins").amount(32.50).category(Category.HEALTH).date(today.minusDays(11)).build(),

                // Last month expenses
                Expense.builder().title("Dinner at Italian restaurant").amount(62.00).category(Category.FOOD).date(today.minusDays(35)).notes("Anniversary dinner").build(),
                Expense.builder().title("Monthly bus pass").amount(75.00).category(Category.TRANSPORT).date(today.minusDays(40)).build(),
                Expense.builder().title("Udemy course - React").amount(12.99).category(Category.EDUCATION).date(today.minusDays(38)).notes("Frontend development course").build(),
                Expense.builder().title("Phone bill").amount(85.00).category(Category.BILLS).date(today.minusDays(32)).build(),
                Expense.builder().title("Concert tickets").amount(95.00).category(Category.ENTERTAINMENT).date(today.minusDays(45)).notes("Live music event").build(),

                // Two months ago expenses
                Expense.builder().title("Dentist checkup").amount(150.00).category(Category.HEALTH).date(today.minusDays(65)).notes("Routine cleaning").build(),
                Expense.builder().title("Books from Barnes & Noble").amount(45.99).category(Category.EDUCATION).date(today.minusDays(70)).notes("3 programming books").build(),
                Expense.builder().title("Car maintenance").amount(280.00).category(Category.TRANSPORT).date(today.minusDays(72)).notes("Oil change and tire rotation").build(),
                Expense.builder().title("Home supplies from Target").amount(67.50).category(Category.OTHER).date(today.minusDays(60)).notes("Cleaning supplies").build()
        );

        expenseRepository.saveAll(expenses);
    }

    private void seedBudgets() {
        List<Budget> budgets = List.of(
                Budget.builder().category(Category.FOOD).monthlyLimit(500.0).build(),
                Budget.builder().category(Category.TRANSPORT).monthlyLimit(300.0).build(),
                Budget.builder().category(Category.SHOPPING).monthlyLimit(400.0).build(),
                Budget.builder().category(Category.ENTERTAINMENT).monthlyLimit(200.0).build(),
                Budget.builder().category(Category.BILLS).monthlyLimit(600.0).build(),
                Budget.builder().category(Category.HEALTH).monthlyLimit(300.0).build(),
                Budget.builder().category(Category.EDUCATION).monthlyLimit(400.0).build(),
                Budget.builder().category(Category.OTHER).monthlyLimit(200.0).build()
        );

        budgetRepository.saveAll(budgets);
    }
}
