package com.euvic.carrental.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "parkings")
@Entity
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String town;

    private String postalCode;

    @Column(nullable = false)
    private String streetName;

    @Column(nullable = false)
    private String number;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Boolean isActive;

    public Parking() {
    }

    public Parking(final Long id, final String town, final String postalCode, final String street, final String number, final String comment, final Boolean isActive) {
        this.id = id;
        this.town = town;
        this.postalCode = postalCode;
        this.streetName = street;
        this.number = number;
        this.comment = comment;
        this.isActive = isActive;
    }
}
