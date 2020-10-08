package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.Allowances;
import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import com.kurswatch.korolyov.kurswatchkorolyov.model.WorkAmount;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.AllowancesRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.UserRepository;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.WorkAmountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class AllowancesController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AllowancesRepository allowancesRepository;

    @Autowired
    WorkAmountRepository workAmountRepository;

    @GetMapping(path = "/allowances")
    public List<Allowances> getAllItems() {
        List<Allowances> allowances = new ArrayList<>();
        allowancesRepository.findAll().forEach(allowances::add);
        return allowances;
    }

    @DeleteMapping(path = "/allowances/{id}")
    public void deleteItem(@PathVariable int id) {
        allowancesRepository.deleteById(id);
    }

    @GetMapping("/allowances/{id}")
    public Allowances getAllowance(@PathVariable int id) {
        Allowances allowance = allowancesRepository.findById(id).get();
        System.out.println(allowance.toString());
        return allowance;
    }

    @PutMapping("/allowances/{id}")
    public ResponseEntity<Allowances> updateAllowance(@PathVariable int id,
                                                      @RequestBody Allowances allowance) {

        Allowances allowanceToUpdate = allowancesRepository.findById(id).get();
        allowanceToUpdate.setType(allowance.getType());
        allowanceToUpdate.setDate(allowance.getDate());
        allowanceToUpdate.setRate(allowance.getRate());
        allowanceToUpdate.setDistribution(allowance.getDistribution());
        allowanceToUpdate.setPeriod(allowance.getPeriod());
        allowanceToUpdate.setUser(allowance.getUser());

        allowancesRepository.save(allowanceToUpdate);

        return new ResponseEntity<>(allowanceToUpdate, HttpStatus.OK);
    }

    @PostMapping("/allowances")
    public ResponseEntity<Allowances> addBonus(@RequestBody Allowances allowance) {

        allowance.setSum(Float.toString(calculateSum(allowance)));

        return new ResponseEntity<>(allowancesRepository.save(allowance), HttpStatus.CREATED);
    }

    public float calculateSum(Allowances allowance) {
        final Integer BASE_RATE = 185;
        User user = userRepository.findById(allowance.getUser().getId()).get();
        String educationPlace = user.getEducationPlace();
        String education = user.getEducation();
        String status = user.getStatus();
        String[] date = allowance.getDate().split("-");
        String month = refactorMonth(date[1]);
        String year = date[0];
        WorkAmount workAmount = workAmountRepository.findByMonthAndYear(month, year);
        Integer workdays = workAmount.getWorkdays();
        Integer totalWorkdays = workAmount.getTotalWorkdays();
        Integer assessment = Integer.parseInt(workAmount.getAssessment());
        Integer allowanceAmount = 0;
        if(allowance.getRate() != null) {
            allowanceAmount = Integer.parseInt(allowance.getRate());
        }
        String distribution = allowance.getDistribution();
        Integer salary = Integer.parseInt(user.getSalary());
        float koef = assessment / 5 * allowanceAmount;
        float sum;

        if (allowance.getType().equals("Молодому специалисту")) {
            if (educationPlace.equals("БГТУ") && (education.equals("Высшее") || education.equals("Среднее специальное")) && status.equals("Педагогический работник") && distribution.equals("+")) {
                allowance.setPeriod("2 года");
                allowance.setRate("30");
                allowanceAmount = 30;
                koef = assessment / 5 * allowanceAmount;
                return (float) salary + (salary * (koef / 100));
            } else if(educationPlace.equals("БГТУ") && (education.equals("Высшее") || education.equals("Среднее специальное")) && status.equals("Молодой специалист") && distribution.equals("+")){
                return (float) salary + (salary * (koef / 100));
            }else if(status.equals("Молодой специалист")){
                allowance.setRate("20");
                allowanceAmount = 20;
                koef = assessment / 5 * allowanceAmount;
                return (float) salary + (salary * (koef / 100));
            }else if(educationPlace.equals("БГТУ") && (education.equals("Высшее") || education.equals("Среднее специальное")) && (status.equals("Педагогический работник") || status.equals("Молодой специалист")) && distribution.equals("-")){
                allowance.setRate("30");
                allowanceAmount = 30;
                koef = assessment / 5 * allowanceAmount;
                return (float) salary + (salary * (koef / 100));
            }else return  salary;
        } else if (allowance.getType().equals("За высокие достижения в труде")) {
            sum = salary + (salary * (koef / 100) / totalWorkdays * workdays);
            if (sum < salary * 2) {
                return sum;
            } else return salary;
        } else if (allowance.getType().equals("За сложность и напряженность труда")) {
            allowance.setPeriod("Квартал");
            return (float) salary + (salary * (koef / 100) / totalWorkdays * workdays);
        } else if(allowance.getType().equals("За характер труда")){
            return (float) salary + (BASE_RATE * koef);
        } else return salary;
    }

    public String refactorMonth(String month){
        String[] splitedMonth = month.split("");

        if(splitedMonth[0].equals("0")) {
            month = splitedMonth[1];
        }

        if(month.equals("1")) return "Январь";
        else if(month.equals("2")) return "Февраль";
        else if(month.equals("3")) return "Март";
        else if(month.equals("4")) return "Апрель";
        else if(month.equals("5")) return "Май";
        else if(month.equals("6")) return "Июнь";
        else if(month.equals("7")) return "Июль";
        else if(month.equals("8")) return "Август";
        else if(month.equals("9")) return "Сентябрь";
        else if(month.equals("10")) return "Октябрь";
        else if(month.equals("11")) return "Ноябрь";
        else if(month.equals("12")) return "Декабрь";

    return null;
    }
}
