package com.expensetracker.repository;

import com.expensetracker.model.Category;
import com.expensetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    @Query("SELECT c FROM Category c WHERE c.user IS NULL OR c.user.id = :userId")
    List<Category> findByUserOrGlobal(@Param("userId") String userId);

    List<Category> findByUserId(String userId);

    Optional<Category> findByUserIdAndNameAndType(String userId, String name, String type);
}
