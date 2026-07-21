package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, String> {

    List<Expense> findByUserIdOrderByTransactionDateDesc(String userId);

    List<Expense> findByUserIdAndTransactionDateBetween(String userId, LocalDate startDate, LocalDate endDate);

    List<Expense> findByUserIdAndCategoryId(String userId, String categoryId);
}
