package com.kurswatch.korolyov.kurswatchkorolyov.repository;

import com.kurswatch.korolyov.kurswatchkorolyov.model.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BonusRepository extends JpaRepository<Bonus, Integer> {
}
