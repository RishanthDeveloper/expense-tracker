package com.expensetracker.repository;

import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByCategory(Category category);

    List<Expense> findByDateBetween(LocalDate start, LocalDate end);

    List<Expense> findByCategoryAndDateBetween(Category category, LocalDate start, LocalDate end);

    List<Expense> findByTitleContainingIgnoreCase(String search);

    List<Expense> findTop5ByOrderByDateDescIdDesc();

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.date BETWEEN :start AND :end")
    Double sumAmountByDateBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.category = :category AND e.date BETWEEN :start AND :end")
    Double sumAmountByCategoryAndDateBetween(@Param("category") Category category,
                                             @Param("start") LocalDate start,
                                             @Param("end") LocalDate end);

    long countByDateBetween(LocalDate start, LocalDate end);

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e WHERE e.date BETWEEN :start AND :end GROUP BY e.category")
    List<Object[]> getCategoryBreakdown(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query(value = "SELECT date, SUM(amount) as total FROM expenses WHERE date BETWEEN :start AND :end GROUP BY date ORDER BY date",
           nativeQuery = true)
    List<Object[]> getDailyTotals(@Param("start") String start, @Param("end") String end);

    @Query(value = "SELECT strftime('%Y-%m', date) as month, SUM(amount) as total FROM expenses GROUP BY strftime('%Y-%m', date) ORDER BY month DESC LIMIT 6",
           nativeQuery = true)
    List<Object[]> getMonthlyTotals();
}
