package com.kurswatch.korolyov.kurswatchkorolyov.repository;

import com.kurswatch.korolyov.kurswatchkorolyov.model.Penalty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PenaltyRepository extends JpaRepository<Penalty, Integer> {
}
