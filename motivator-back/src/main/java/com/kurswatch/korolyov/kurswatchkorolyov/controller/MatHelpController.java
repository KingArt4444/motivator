package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.MatHelp;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.MatHelpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class MatHelpController {

    @Autowired
    MatHelpRepository matHelpRepository;

    @GetMapping(path = "/mathelp")
    public List<MatHelp> getAllItems() {
        List<MatHelp> matHelps = new ArrayList<>();
        matHelpRepository.findAll().forEach(matHelps::add);
        return matHelps;
    }

    @DeleteMapping(path = "/mathelp/{id}")
    public void deleteItem(@PathVariable int id) {
        matHelpRepository.deleteById(id);
    }

    @GetMapping("/mathelp/{id}")
    public MatHelp getMatHelpItem(@PathVariable int id) {
        MatHelp matHelp = matHelpRepository.findById(id).get();
        System.out.println(matHelp.toString());
        return matHelp;
    }

    @PutMapping("/mathelp/{id}")
    public ResponseEntity<MatHelp> updateMatHelpItem(@PathVariable int id,
                                                     @RequestBody MatHelp matHelp) {

        MatHelp matHelpToUpdate = matHelpRepository.findById(id).get();
        matHelpToUpdate.setReason(matHelp.getReason());
        matHelpToUpdate.setRate(matHelp.getRate());
        matHelpToUpdate.setAmount(matHelp.getAmount());
        matHelpToUpdate.setDate(matHelp.getDate());
        matHelpToUpdate.setUser(matHelp.getUser());

        matHelpRepository.save(matHelpToUpdate);

        return new ResponseEntity<>(matHelpToUpdate, HttpStatus.OK);
    }

    @PostMapping("/mathelp")
    public ResponseEntity<MatHelp> addMatHelpItem(@RequestBody MatHelp matHelp) {
        final Integer BASE_RATE = 185;

        if (matHelp.getReason().equals("Первый брак")) {
            matHelp.setRate("0.6");
            matHelp.setAmount(Double.toString(BASE_RATE * 0.6));
        } else {
            matHelp.setAmount(Double.toString(BASE_RATE * Double.valueOf(matHelp.getRate())));
        }

        return new ResponseEntity<>(matHelpRepository.save(matHelp), HttpStatus.CREATED);
    }
}
