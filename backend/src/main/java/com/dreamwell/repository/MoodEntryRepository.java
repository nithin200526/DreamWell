package com.dreamwell.repository;

import com.dreamwell.entity.MoodEntry;
import com.dreamwell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    List<MoodEntry> findByUserOrderByEntryDateDesc(User user);
    Optional<MoodEntry> findByUserAndEntryDate(User user, LocalDate entryDate);
    
    @Query("SELECT m FROM MoodEntry m WHERE m.user = :user AND m.entryDate BETWEEN :startDate AND :endDate ORDER BY m.entryDate")
    List<MoodEntry> findByUserAndDateRange(@Param("user") User user, 
                                           @Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
}
