import React, { useEffect, useState } from "react";
import { Container, List, ListItem, Link } from "@material-ui/core";
const CarInfo = ({ car }) => {
  const {
    capacityOfPeople,
    capacityOfTrunkScale,
    doorsNumber,
    licensePlate,
    mileage,
    modelDTO,
    typeDTO,
    enginePower,
    productionYear,
    isActive,
  } = car;
  const { name, markDTO } = modelDTO;

  return (
    <Container>
      <h1 style={{ fontSize: "1.3rem" }}>
        <Link href="#">
          {markDTO.name} {name}
        </Link>
      </h1>
      <h2>{licensePlate}</h2>
      <List>
        <ListItem>
          <label>Year of production: {productionYear}</label>
        </ListItem>
        <ListItem>
          <label>Mileage: {mileage}</label>
        </ListItem>
        <ListItem>
          <label>Hp: {enginePower}</label>
        </ListItem>
        <ListItem>
          <label>Capacity: {capacityOfPeople}</label>
        </ListItem>
        <ListItem>
          <label>Type: {typeDTO.name}</label>
        </ListItem>
      </List>
    </Container>
  );
};

export default CarInfo;
