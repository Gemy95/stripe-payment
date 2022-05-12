import React, { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


const PaymentForm = () => {

  const [amount, setAmount] = React.useState<number>(1);
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
    <form
      onSubmit={(event) => {
        HandleSubmit(event);
      }}
    >
      <div>
        <label>Enter Amount that you want to pay:</label>
        <input
          type="number"
          min={100}
          value={amount}
          onChange={handleInputAmountChange}
        />
      </div>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
