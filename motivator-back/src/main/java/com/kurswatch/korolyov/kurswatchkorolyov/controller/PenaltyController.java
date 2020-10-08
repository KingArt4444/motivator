package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.Penalty;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.PenaltyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class PenaltyController {

    @Autowired
    PenaltyRepository penaltyRepository;

    @GetMapping(path = "/penalties")
    public List<Penalty> getAllItems() {
        List<Penalty> penalties = new ArrayList<>();
        penaltyRepository.findAll().forEach(penalties::add);
        return penalties;
    }

    @DeleteMapping(path = "/penalties/{id}")
    public void deleteItem(@PathVariable int id) {
        penaltyRepository.deleteById(id);
    }

    @GetMapping("/penalties/{id}")
    public Penalty getPenalty(@PathVariable int id) {
        Penalty penalty = penaltyRepository.findById(id).get();
        System.out.println(penalty.toString());
        return penalty;
    }

    @PutMapping("/penalties/{id}")
    public ResponseEntity<Penalty> updatePenalty(@PathVariable int id,
                                                     @RequestBody Penalty penalty) {

        Penalty penaltyToUpdate = penaltyRepository.findById(id).get();
        penaltyToUpdate.setType(penalty.getType());
        penaltyToUpdate.setReason(penalty.getReason());
        penaltyToUpdate.setDate(penalty.getDate());
        penaltyToUpdate.setDuration(penalty.getDuration());
        penaltyToUpdate.setUser(penalty.getUser());

        penaltyRepository.save(penaltyToUpdate);

        return new ResponseEntity<>(penaltyToUpdate, HttpStatus.OK);
    }

    @PostMapping("/penalties")
    public ResponseEntity<Penalty> addPenalty(@RequestBody Penalty penalty) {
        return new ResponseEntity<>(penaltyRepository.save(penalty), HttpStatus.CREATED);
    }
}
