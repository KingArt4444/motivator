package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.HealthBenefits;
import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.HealthBenefitsRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class HealthBenefitsController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HealthBenefitsRepository healthBenefitsRepository;

    @GetMapping(path = "/healthbenefits")
    public List<HealthBenefits> getAllItems(){
        List<HealthBenefits> healthBenefits = new ArrayList<>();
        healthBenefitsRepository.findAll().forEach(healthBenefits:: add);
        return healthBenefits;
    }

    @DeleteMapping(path = "/healthbenefits/{id}")
    public void deleteItem(@PathVariable int id){
        healthBenefitsRepository.deleteById(id);
    }

    @GetMapping("/healthbenefits/{id}")
    public HealthBenefits getHealthBenefit(@PathVariable int id) {
        HealthBenefits healthBenefits = healthBenefitsRepository.findById(id).get();
        System.out.println(healthBenefits.toString());
        return healthBenefits;
    }

    @PutMapping("/healthbenefits/{id}")
    public ResponseEntity<HealthBenefits> updateHealthBenefit(@PathVariable int id,
                                             @RequestBody HealthBenefits healthBenefit) {

        HealthBenefits benefitToUpdate = healthBenefitsRepository.findById(id).get();
        benefitToUpdate.setReason(healthBenefit.getReason());
        benefitToUpdate.setAmount(healthBenefit.getAmount());
        benefitToUpdate.setDate(healthBenefit.getDate());
        benefitToUpdate.setUser(healthBenefit.getUser());

        healthBenefitsRepository.save(benefitToUpdate);

        return new ResponseEntity<>(benefitToUpdate, HttpStatus.OK);
    }

    @PostMapping("/healthbenefits")
    public ResponseEntity<HealthBenefits> addBonus(@RequestBody HealthBenefits healthBenefit){

        healthBenefit.setAmount(Double.toString(calculateAmount(healthBenefit)));

        return new ResponseEntity<>(healthBenefitsRepository.save(healthBenefit), HttpStatus.CREATED);
    }

    public double calculateAmount(HealthBenefits healthBenefit){
        User user = userRepository.findById(healthBenefit.getUser().getId()).get();
        Integer salary = Integer.parseInt(user.getSalary());
        Double sum = salary * 0.5;
        return sum;
    }
}
