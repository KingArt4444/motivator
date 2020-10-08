package com.kurswatch.korolyov.kurswatchkorolyov.repoImpl;

import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.WorkAmountRepoCustom;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.WorkAmountRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class WorkAmountRepoImpl implements WorkAmountRepoCustom {
    @Autowired
    WorkAmountRepository workAmountRepository;

    @Override
    public WorkAmount findByMonthAndYear(String month, String year) {
        List<WorkAmount> workAmounts = workAmountRepository.findAll();

        for(WorkAmount workAmount : workAmounts){
            if(workAmount.getMonth().equals(month) && workAmount.getYear().equals(year)){
                return workAmount;
            }
        }
        return null;
    }
}
