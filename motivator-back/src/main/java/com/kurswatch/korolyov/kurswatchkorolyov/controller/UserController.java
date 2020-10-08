package com.kurswatch.korolyov.kurswatchkorolyov.controller;

import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import com.kurswatch.korolyov.kurswatchkorolyov.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(path = "/users")
    public List<User> getAllItems(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users:: add);
        return users;
    }

    @DeleteMapping(path = "/users/{id}")
    public void deleteItem(@PathVariable int id){
        userRepository.deleteById(id);
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        User user = userRepository.findById(id).get();
        System.out.println(user.toString());
        return user;
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id,
                                           @RequestBody User user) {

        User userToUpdate = userRepository.findById(id).get();
        userToUpdate.setName(user.getName());
        userToUpdate.setSurname(user.getSurname());
        userToUpdate.setAge(user.getAge());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setSalary(user.getSalary());
        userToUpdate.setStatus(user.getStatus());
        userToUpdate.setEducation(user.getEducation());
        userToUpdate.setEducationPlace(user.getEducationPlace());

        userRepository.save(userToUpdate);

        return new ResponseEntity<>(userToUpdate, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody User user) {

        User createdUser = userRepository.save(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}
