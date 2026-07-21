package com.expensetracker.repository;

import com.expensetracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, String> {

    List<Income> findByUserIdOrderByTransactionDateDesc(String userId);

    List<Income> findByUserIdAndTransactionDateBetween(String userId, LocalDate startDate, LocalDate endDate);
}
