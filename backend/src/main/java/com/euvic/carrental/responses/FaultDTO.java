package com.euvic.carrental.responses;

import com.euvic.carrental.model.Fault;
import lombok.Data;

@Data
public class FaultDTO {
    private String description;
    private Boolean setCarInactive;
    private String carLicensePlate;

    public FaultDTO() {

    }

    public FaultDTO(final String carLicensePlate, final String description, final Boolean setCarInactive) {
        this.description = description;
        this.setCarInactive = setCarInactive;
        this.carLicensePlate = carLicensePlate;
    }

    public FaultDTO(final Fault fault, final String carLicensePlate) {
        this.description = fault.getDescription();
        this.setCarInactive = fault.getSetCarInactive();
        this.carLicensePlate = carLicensePlate;
    }
}
