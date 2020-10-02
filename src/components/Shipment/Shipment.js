import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useContext } from 'react';
import { userContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const orderDetail = {...loggedInUser}
    };
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="Name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.Name && <span className="error">Name is required!</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">Email is required@</span>}
        <input name="address" ref={register({ required: true })} placeholder="Address" />
        {errors.address && <span className="error">Address is required!</span>}
        <input name="phone" ref={register({ required: true })} placeholder="Phone Number" />
        {errors.phone && <span className="error">Phone is required!</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;