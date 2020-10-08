package com.kurswatch.korolyov.kurswatchkorolyov.repository;

import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkAmountRepository extends JpaRepository<WorkAmount, Integer>, WorkAmountRepoCustom {
}
