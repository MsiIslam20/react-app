import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { register, handleSubmit, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {

    const savedCart = getDatabaseCart();
    const orderDetail = { 
      ...loggedInUser, 
      products: savedCart, 
      shipment: shippingData, 
      paymentId,
      orderTime: new Date() 
    };
    fetch("https://calm-garden-46705.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert("Your Order Place Successfully")
        }
      })
  }

  return (
    <div className="row">
      <div style={{display: shippingData ? "none" : "block"}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="Name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.Name && <span className="error">Name is required!</span>}
          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required@</span>}
          <input name="address" ref={register({ required: true })} placeholder="Address" />
          {errors.address && <span className="error">Address is required!!</span>}
          <input name="phone" ref={register({ required: true })} placeholder="Phone Number" />
          {errors.phone && <span className="error">Phone is required!!</span>}
          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? "block" : "none"}} className="col-md-6 pr-4">
        <h2 className="mb-5 mt-3">Please Proceed your payment..</h2>
        <div className="pr-5 pl-5">
          <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
    </div>
  );
};

export default Shipment;