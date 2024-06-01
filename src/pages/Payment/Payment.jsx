import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../component/checkoutForm/CheckoutForm";
import { Container } from "@mui/joy";

const Payment = () => {
  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  };

  const stripePromise = loadStripe(
    "pk_test_51PMpQrRsirl7iyu7sUZjQj8fd2rE3OGM1u9Q0PGD733YUMydTs3TUEauOIvhvYVN9xtKWKB45SLpBpbGi0913if300eUbID1Gq"
  );

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        textAlign: "center",
        mt: 10,
        border: "1px solid rgba(37,20,100, 0.60)",
        borderRadius: 6,
        WebKitCSSMatrix: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
        MozBoxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
        boxShadow: "0px 0px 231px 45px rgba(37,20,100, 0.60)",
      }}
      className="AppWrapper"
    >
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Payment;
