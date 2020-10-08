package com.kurswatch.korolyov.kurswatchkorolyov.repository;

import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;

public interface WorkAmountRepoCustom {
    WorkAmount findByMonthAndYear(String month, String year);
}
