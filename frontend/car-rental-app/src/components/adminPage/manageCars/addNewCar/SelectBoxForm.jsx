import React from "react";
import { Box } from "@material-ui/core";
import { SelectBox } from "./SelectBox";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMarks,
  selectTypes,
  selectFuelType,
  selectColor,
  selectGearboxType,
} from "../../../../features/starting-car-parameter/startingCarParameterSlice";
import {
  brandChange,
  typeChange,
  fuelTypeChange,
  colorChange,
  gearboxTypeChange,
  markDTOchange,
} from "../../../../features/add-car-info/carsInfoSlice";
import { TextValidator } from "react-material-ui-form-validator";

const SelectBoxForm = ({
  modelDTO,
  typeDTO,
  fuelTypeDTO,
  colourDTO,
  gearBoxTypeDTO,
  markDTO,
}) => {
  const marks = useSelector(selectMarks);
  const types = useSelector(selectTypes);
  const FuelTypes = useSelector(selectFuelType);
  const ColorTypes = useSelector(selectColor);
  const GearboxType = useSelector(selectGearboxType);
  const dispatch = useDispatch();
  return (
    <div>
      <Box display="flex" justifyContent="center" style={{ height: "10vh" }}>
        <SelectBox
          SelectHandler={marks}
          NameHandler="Mark"
          handleChange={(event) => dispatch(brandChange(event.target.value))}
          handlerValue={modelDTO}
        />
        <TextValidator
          style={{ marginTop: "0.8vh" }}
          label="Model"
          onChange={(event) => dispatch(markDTOchange(event.target.value))}
          value={markDTO}
          validators={["required", "minStringLength:1"]}
          errorMessages={["this field is required", "Length is wrong"]}
        />
        <SelectBox
          SelectHandler={types}
          NameHandler="Type"
          handleChange={(event) => dispatch(typeChange(event.target.value))}
          handlerValue={typeDTO}
        />
      </Box>
      <Box display="flex" justifyContent="center" style={{ height: "10vh" }}>
        <SelectBox
          SelectHandler={FuelTypes}
          NameHandler="Fuel Type"
          handleChange={(event) => dispatch(fuelTypeChange(event.target.value))}
          handlerValue={fuelTypeDTO}
        />
        <SelectBox
          SelectHandler={ColorTypes}
          NameHandler="Color"
          handleChange={(event) => dispatch(colorChange(event.target.value))}
          handlerValue={colourDTO}
        />
        <SelectBox
          SelectHandler={GearboxType}
          NameHandler="Gearbox Type"
          handleChange={(event) =>
            dispatch(gearboxTypeChange(event.target.value))
          }
          handlerValue={gearBoxTypeDTO}
        />
      </Box>
    </div>
  );
};

export default SelectBoxForm;
