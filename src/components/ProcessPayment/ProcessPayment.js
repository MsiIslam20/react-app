import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_51HcqqsF9971vAUQRtKEi3si89Zo2mf2TK74FTvU8N8ZWAZCQ9wkGL0IlHkmWPyZG7kbtjwH6C5hCqHFBRxchMeWY00yx0ZOkFX');

const ProcessPayment = ({handlePaymentSuccess}) => {
  return (
    <Elements stripe={stripePromise}>
        <CardForm handlePaymentSuccess={handlePaymentSuccess}></CardForm>
    </Elements>
  );
};

export default ProcessPayment;