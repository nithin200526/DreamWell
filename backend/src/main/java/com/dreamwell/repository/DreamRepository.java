package com.dreamwell.repository;

import com.dreamwell.entity.Dream;
import com.dreamwell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DreamRepository extends JpaRepository<Dream, Long> {
    List<Dream> findByUserOrderByDreamDateDesc(User user);
    List<Dream> findByUserAndIsFlaggedOrderByCreatedAtDesc(User user, Boolean isFlagged);
    List<Dream> findByIsFlaggedOrderByCreatedAtDesc(Boolean isFlagged);
    
    @Query("SELECT d FROM Dream d WHERE d.user = :user AND " +
           "(LOWER(d.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.dreamText) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.tags) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Dream> searchDreams(@Param("user") User user, @Param("keyword") String keyword);
    
    @Query("SELECT d FROM Dream d WHERE d.user = :user AND d.dreamDate BETWEEN :startDate AND :endDate")
    List<Dream> findByUserAndDateRange(@Param("user") User user, 
                                       @Param("startDate") LocalDateTime startDate, 
                                       @Param("endDate") LocalDateTime endDate);
    
    Long countByUser(User user);
}
