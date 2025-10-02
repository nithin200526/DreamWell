package com.dreamwell.repository;

import com.dreamwell.entity.Dream;
import com.dreamwell.entity.DreamInterpretation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DreamInterpretationRepository extends JpaRepository<DreamInterpretation, Long> {
    Optional<DreamInterpretation> findByDream(Dream dream);
}
