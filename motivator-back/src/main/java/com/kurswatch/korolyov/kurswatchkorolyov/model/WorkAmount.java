package com.kurswatch.korolyov.kurswatchkorolyov.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "work_amount")
public class WorkAmount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "workdays")
    private Integer workdays;
    @Column(name = "total_workdays")
    private Integer totalWorkdays;
    @Column(name = "assessment")
    private String assessment;
    @Column(name = "month")
    private String month;
    @Column(name = "year")
    private String year;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="employee_id")
    private User user;
}
