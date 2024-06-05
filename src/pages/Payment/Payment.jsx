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

  const stripePromise = loadStripe(`${import.meta.env.VITE_stripe_PK}`);

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
