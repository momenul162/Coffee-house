import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { ELEMENT_OPTIONS, ErrorResult, Result } from "../../utils/payment-handle/utils";
import "../../pages/Payment/Payment.css";
import { useStoreState } from "easy-peasy";
import { Button } from "@mui/joy";

const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const { user } = useStoreState((state) => state.currentUser);

  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card == null) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (payload.error) {
      console.log("[error]", payload.error);
      setErrorMessage(payload.error.message);
      setPaymentMethod(null);
    } else {
      console.log("[PaymentMethod]", payload.paymentMethod);
      setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number</label>
      <CardNumberElement id="cardNumber" options={ELEMENT_OPTIONS} />
      <label htmlFor="expiry">Card Expiration</label>
      <CardExpiryElement id="expiry" options={ELEMENT_OPTIONS} />
      <label htmlFor="cvc">CVC</label>
      <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
      <label htmlFor="postal">Postal Code</label>
      <input
        id="postal"
        required
        placeholder="12345"
        value={postal}
        onChange={(e) => {
          setPostal(e.target.value);
        }}
      />
      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
      <Button fullWidth={true} type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
