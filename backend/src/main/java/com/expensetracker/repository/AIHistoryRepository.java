package com.expensetracker.repository;

import com.expensetracker.model.AIHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AIHistoryRepository extends JpaRepository<AIHistory, String> {

    List<AIHistory> findByUserIdOrderByCreatedAtDesc(String userId);
}
