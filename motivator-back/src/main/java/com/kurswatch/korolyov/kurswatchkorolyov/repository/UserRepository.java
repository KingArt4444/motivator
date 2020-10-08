package com.kurswatch.korolyov.kurswatchkorolyov.repository;

import com.kurswatch.korolyov.kurswatchkorolyov.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}