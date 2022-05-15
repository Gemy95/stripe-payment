import React, { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};


const PaymentForm = () => {
  const [amount, setAmount] = React.useState<number>(100);
  const stripe = useStripe();
  const elements = useElements();

  const handleInputAmountChange = (e: any) => {
    setAmount(parseInt(e.target.value));
  };

  const HandleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    // 5555 5555 5555 4444 as test master card
    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJuYW1lIjoiYWxpIGdhbWFsIiwiZW1haWwiOiJhbGkuZ2FtYWw5NTg4MEBnbWFpbC5jb20iLCJzdHJpcGVDdXN0b21lcklkIjoiY3VzX0xmdXY1dWhyZTBMcDlyIiwiY3JlYXRlZF9hdCI6IjIwMjItMDUtMTJUMTA6MTc6NDQuMDExWiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA1LTEyVDEwOjE3OjQ0LjAyMFoifSwiaWF0IjoxNjUyMzUwNjc5fQ.9Sz6FhcZb556AaMKBEVJymkNID0bflzkBpPU9pZUjiY`;

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/charge`,
        {
          paymentMethodId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="Form"
      onSubmit={(event) => {
        HandleSubmit(event);
      }}
    >
      <div className="FormRow">
        <label className="FormRowLabel">Enter Amount To Pay :</label>
      </div>
      <div className="FormRow">
      <input className="FormRowInput"
          type="number"
          min={100}
          value={amount}
          onChange={handleInputAmountChange}
        />
        </div>
      <div className="FormRow">
        <CardElement options={CARD_OPTIONS} />
      </div>
      <button className={`SubmitButton`} type="submit" > Pay </button>
    </form>
  );
};

export default PaymentForm;
