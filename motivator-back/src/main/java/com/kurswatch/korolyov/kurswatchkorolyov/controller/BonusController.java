package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.Bonus;
import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.BonusRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.UserRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.WorkAmountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static javax.swing.UIManager.get;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class BonusController {

    @Autowired
    BonusRepository bonusRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WorkAmountRepository workAmountRepository;

    @GetMapping(path = "/bonuses")
    public List<Bonus> getAllItems(){
        List<Bonus> bonuses = new ArrayList<>();
        bonusRepository.findAll().forEach(bonuses:: add);
        return bonuses;
    }

    @DeleteMapping(path = "/bonuses/{id}")
    public void deleteItem(@PathVariable int id){
        bonusRepository.deleteById(id);
    }

    @GetMapping("/bonuses/{id}")
    public Bonus getBonus(@PathVariable int id) {
        Bonus bonus = bonusRepository.findById(id).get();
        System.out.println(bonus.toString());
        return bonus;
    }

    @PutMapping("/bonuses/{id}")
    public ResponseEntity<Bonus> updateBonus(@PathVariable int id,
                                           @RequestBody Bonus bonus) {

        Bonus bonusToUpdate = bonusRepository.findById(id).get();
        bonusToUpdate.setType(bonus.getType());
        bonusToUpdate.setBonusamount(bonus.getBonusamount());
        bonusToUpdate.setSum(bonus.getSum());
        bonusToUpdate.setYear(bonus.getYear());
        bonusToUpdate.setMonth(bonus.getMonth());
        bonusToUpdate.setUser(bonus.getUser());

        bonusRepository.save(bonusToUpdate);

        return new ResponseEntity<>(bonusToUpdate, HttpStatus.OK);
    }

//    @PostMapping("/salaries")
//    public ResponseEntity<Void> createSalary(@RequestBody Map<String, JsonNode> json) {
//
//        String workAmount = json.get("data1").asText();
//        JsonObject convertedObject = new Gson().fromJson(workAmount, JsonObject.class);
//
////        Integer newId = Integer.valueOf(userId);
////        User user = userRepository.findById(newId).get();
//        Salary salary = new Salary();
//
//        Salary createdSalary = salaryRepository.save(salary);
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdSalary.getId())
//                .toUri();
//
//        return ResponseEntity.created(uri).build();
//    }

    @PostMapping("/bonuses")
    public ResponseEntity<Bonus> addBonus(@RequestBody Bonus bonus){

        bonus.setSum(Float.toString(calculateSum(bonus)));

        return new ResponseEntity<>(bonusRepository.save(bonus), HttpStatus.CREATED);
    }

    public float calculateSum(Bonus bonus){
        User user = userRepository.findById(bonus.getUser().getId()).get();
        WorkAmount workAmount = workAmountRepository.findByMonthAndYear(bonus.getMonth(), bonus.getYear());
        Integer workdays = workAmount.getWorkdays();
        Integer totalWorkdays = workAmount.getTotalWorkdays();
        Integer assessment = Integer.parseInt(workAmount.getAssessment());
        Integer bonusAmount = Integer.parseInt(bonus.getBonusamount());
        Integer salary = Integer.parseInt(user.getSalary());
        float koef = assessment/5 * bonusAmount;
        float sum;

        if(bonus.getType().equals("Базовое")){
            if(bonusAmount - (5 - assessment) < 1) return salary;
            else{
                return (float) (salary + (salary * ((bonusAmount - (5 - assessment))/100) / totalWorkdays * workdays));
            }
        }else if(bonus.getType().equals("Дополнительное")){
            sum = salary + (salary * (koef/100) / totalWorkdays * workdays);
            if(sum < salary * 2){
                return sum;
            }else return salary;
        }else if(bonus.getType().equals("Разовое")){
            return (float) salary + (salary * (koef/100) / totalWorkdays * workdays);
        }else return salary;

    }

}
