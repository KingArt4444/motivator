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
@Table(name = "mat_help")
public class MatHelp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "reason")
    private String reason;
    @Column(name = "rate")
    private String rate;
    @Column(name = "amount")
    private String amount;
    @Column(name = "date")
    private String date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="employee_id")
    private User user;
}
