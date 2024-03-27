import React from "react";
import { Container, Grid } from "@mui/material";
import imgCup from "../../../assets/coffee-cup.png";
import quality from "../../../assets/quality.png";
import coffeeBean from "../../../assets/coffee-beans.png";
import coffee from "../../../assets/coffee.png";
import FeatureCoffee from "../../../component/FeatureCoffee";

const Feature = () => {
  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, lg: 4, md: 3 }} mt={2}>
        <FeatureCoffee
          img={imgCup}
          title="Awesome Aroma"
          body="You will definitely be a fan of the design & aroma of your coffee"
        />
        <FeatureCoffee
          img={quality}
          title="High Quality"
          body="We served the coffee to you maintaining the best quality"
        />
        <FeatureCoffee
          img={coffeeBean}
          title="Pure Grades"
          body="The coffee is made of the green coffee beans which you will love"
        />
        <FeatureCoffee
          img={coffee}
          title="Proper Roasting"
          body="Your coffee is brewed by first roasting the green coffee beans"
        />
      </Grid>
    </Container>
  );
};

export default Feature;
