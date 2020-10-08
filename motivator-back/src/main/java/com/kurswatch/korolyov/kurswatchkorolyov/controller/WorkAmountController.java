package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.jayway.jsonpath.internal.filter.ValueNode;
import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.UserRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.WorkAmountRepository;
import jdk.nashorn.internal.parser.JSONParser;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static javax.swing.UIManager.get;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class WorkAmountController {

    @Autowired
    WorkAmountRepository workAmountRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(path = "/workamounts")
    public List<WorkAmount> getAllItems(){
        List<WorkAmount> workAmounts = new ArrayList<>();
        workAmountRepository.findAll().forEach(workAmounts:: add);
        return workAmounts;
    }

    @DeleteMapping(path = "/workamounts/{id}")
    public void deleteItem(@PathVariable int id){
        workAmountRepository.deleteById(id);
    }

    @GetMapping("/workamounts/{id}")
    public WorkAmount getWorkAmount(@PathVariable int id) {
        WorkAmount workAmount = workAmountRepository.findById(id).get();
        System.out.println(workAmount.toString());
        return workAmount;
    }

    @PutMapping("/workamounts/{id}")
    public ResponseEntity<WorkAmount> updatePenalty(@PathVariable int id,
                                                 @RequestBody WorkAmount workAmount) {

        WorkAmount workAmountToUpdate = workAmountRepository.findById(id).get();
        workAmountToUpdate.setWorkdays(workAmount.getWorkdays());
        workAmountToUpdate.setTotalWorkdays(workAmount.getTotalWorkdays());
        workAmountToUpdate.setAssessment(workAmount.getAssessment());
        workAmountToUpdate.setMonth(workAmount.getMonth());
        workAmountToUpdate.setYear(workAmount.getYear());
        workAmountToUpdate.setUser(workAmount.getUser());

        workAmountRepository.save(workAmountToUpdate);

        return new ResponseEntity<>(workAmountToUpdate, HttpStatus.OK);
    }

    @PostMapping("/workamounts")
    public ResponseEntity<WorkAmount> createAmount(@RequestBody WorkAmount workAmount) {
        return new ResponseEntity<>(workAmountRepository.save(workAmount), HttpStatus.CREATED);
    }
}
