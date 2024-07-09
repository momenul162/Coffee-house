import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { ELEMENT_OPTIONS, ErrorResult, Result } from "../../utils/payment-handle/utils";
import { useStoreState } from "easy-peasy";
import { Box, Button, CircularProgress, Typography } from "@mui/joy";
import { baseURL } from "../../utils/baseURL";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "../../pages/Payment/Payment.module.css";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const [postal, setPostal] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [carts, setCarts] = useState([]);
  const [progress, setProgress] = useState(false);

  const { user } = useStoreState((state) => state.currentUser);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    baseURL.get(`/api/carts/${user._id}`).then((res) => {
      setCarts(res?.data),
        setPrice(res?.data?.reduce((acc, cur) => acc + cur.itemId.price * cur.quantity, 0));
    });
  }, [user.email]);

  useEffect(() => {
    if (price > 0) {
      baseURL.post("/payment_intents", { price: parseFloat(price) }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

  /*
 Payment Handler
*/

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card == null) {
      return;
    }

    setProgress(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card });

    setErrorMessage(error?.message || "");

    setProgress(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.name,
          email: user?.email,
          address: {
            postal_code: postal,
          },
        },
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError);
    }

    if (paymentIntent) {
      setProgress(false);
      setTransactionId(paymentIntent.id);
      setErrorMessage("");
    }

    const payment = {
      amount: price,
      userId: user?._id,
      cartItem: carts?.map((item) => item._id),
      productId: carts?.map((item) => item.itemId._id),
    };
    baseURL.post("/payment-history", payment).then((res) => {
      if (res.data._id) {
        navigate("/my-orders");
      }
    });
    if (transactionId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Payment Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Link to="/">
        <Typography
          sx={{ display: "flex", alignItems: "center", mb: 4, "&:hover": { color: "Highlight" } }}
        >
          <KeyboardBackspaceIcon /> Back to Home
        </Typography>
      </Link>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElement
          id="cardNumber"
          className={styles.cardNumber}
          options={ELEMENT_OPTIONS}
        />
        <label htmlFor="expiry">Card Expiration</label>
        <CardExpiryElement id="expiry" className={styles.expiry} options={ELEMENT_OPTIONS} />
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement id="cvc" className={styles.cvc} options={ELEMENT_OPTIONS} />
        <label htmlFor="postal">Postal Code</label>
        <input
          className={styles.postal}
          id="postal"
          required
          placeholder="12345"
          value={postal}
          onChange={(e) => {
            setPostal(e.target.value);
          }}
        />
        {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
        {transactionId && <Result>Your Payment Success</Result>}

        {progress ? (
          <Button
            startDecorator={<CircularProgress variant="solid" />}
            fullWidth={true}
            disabled={!stripe || !clientSecret || progress}
          >
            Loading...
          </Button>
        ) : (
          <Button
            fullWidth={true}
            variant="outlined"
            sx={{
              color: "rgba(68,42,107, 0.96)",
              ":hover": { color: "rgba(158,22,17, 0.69)", bgcolor: "rgba(68,42,107, 0.50)" },
            }}
            type="submit"
            disabled={!stripe || !clientSecret || progress}
          >
            Payment
          </Button>
        )}
      </form>
    </Box>
  );
};

export default CheckoutForm;
