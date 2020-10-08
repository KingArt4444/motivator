package com.kurswatch.korolyov.kurswatchkorolyov.model;

//import com.vaadin.flow.component.polymertemplate.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.beans.Transient;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "employee")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "age")
    private Integer age;
    @Column(name = "email")
    private String email;
    @Column(name = "salary")
    private String salary;
    @Column(name = "status")
    private String status;
    @Column(name = "education")
    private String education;
    @Column(name = "education_place")
    private String educationPlace;

}
