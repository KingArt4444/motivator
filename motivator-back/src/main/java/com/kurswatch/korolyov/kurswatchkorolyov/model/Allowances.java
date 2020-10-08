package com.kurswatch.korolyov.kurswatchkorolyov.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "allowances")
public class Allowances {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "type")
    private String type;
    @Column(name = "date")
    private String date;
    @Column(name = "rate")
    private String rate;
    @Column(name = "sum")
    private String sum;
    @Column(name = "distribution")
    private String distribution;
    @Column(name = "period")
    private String period;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="employee_id")
    private User user;
}
