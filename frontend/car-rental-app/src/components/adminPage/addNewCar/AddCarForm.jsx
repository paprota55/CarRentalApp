import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Save, Delete } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAll,
  addCar,
  reset,
  imageFileChange,
  addImage,
} from "../../../features/add-car-info/carsInfoSlice";
import SelectBoxForm from "./SelectBoxForm";
import BoxPanel from "./BoxPanel";
import ParkingForm from "./ParkingForm";

const AddCarForm = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const dispatch = useDispatch();
  const classes = useStyles();
  const CarInfo = useSelector(selectAll);

  const {
    modelDTO,
    typeDTO,
    licensePlate,
    fuelTypeDTO,
    productionYear,
    mileage,
    enginePower,
    capacityOfPeople,
    doorsNumber,
    colourDTO,
    gearBoxTypeDTO,
    capacityOfTrunkScale,
    imageFile,
    lastInspection,
    town,
    streetName,
    number,
    comment,
    postalCode,
  } = CarInfo;

  function submit(event) {
    event.preventDefault();
    let car = {
      licensePlate: licensePlate,
      enginePower: enginePower,
      capacityOfTrunkScale: capacityOfTrunkScale,
      capacityOfPeople: capacityOfPeople,
      doorsNumber: doorsNumber,
      gearBoxTypeDTO: { name: gearBoxTypeDTO },
      fuelTypeDTO: { name: fuelTypeDTO },
      lastInspection: lastInspection,
      productionYear: productionYear,
      isActive: true,
      mileage: mileage,
      modelDTO: { name: modelDTO, markDTO: { name: modelDTO } },
      parkingDTO: {
        town: town,
        postalCode: postalCode,
        streetName: streetName,
        number: number,
        comment: comment,
        isActive: true,
      },
      colourDTO: { name: colourDTO },
      typeDTO: { name: typeDTO },
    };
    let image = {
      imageFile: imageFile,
    };
    dispatch(addCar(car));
    dispatch(addImage(image, licensePlate));
    dispatch(reset());
  }

  function resetf() {
    dispatch(reset());
  }

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            textTransform: "uppercase",
          }}
        >
          Add car form.
        </h3>
      </Box>
      <SelectBoxForm
        modelDTO={modelDTO}
        typeDTO={typeDTO}
        fuelTypeDTO={fuelTypeDTO}
        colourDTO={colourDTO}
        gearBoxTypeDTO={gearBoxTypeDTO}
      />
      <BoxPanel
        mileage={mileage}
        enginePower={enginePower}
        licensePlate={licensePlate}
        productionYear={productionYear}
        capacityOfPeople={capacityOfPeople}
        doorsNumber={doorsNumber}
        capacityOfTrunkScale={capacityOfTrunkScale}
      />
      <div style={{ height: "5vh" }}></div>
      <ParkingForm
        town={town}
        postalCode={postalCode}
        streetName={streetName}
        number={number}
        comment={comment}
      />
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          value={imageFile}
          onChange={(event) => dispatch(imageFileChange(event.target.value))}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Photo
          </Button>
        </label>
      </Box>

      <Box display="flex" justifyContent="center" m={1} p={1}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="normal"
            className={classes.button}
            startIcon={<Save />}
            type="submit"
            onClick={submit}
          >
            Save
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<Delete />}
            type="submit"
            onClick={resetf}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddCarForm;