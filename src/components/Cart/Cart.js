import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    const total = cart.reduce((total , prd) => total + prd.price * prd.quantity || 1 , 0);

    //Other Way
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const prd = cart[i];
    //     total = total + prd.price;
    // }
    let shipping = 0;

    if(total > 35){
        shipping = 0;
    } else if(total > 15){
        shipping = 4.99;
    } else if(total > 0){
        shipping = 12.99;
    }

    const formatNumber = value => {
        const precision = value.toFixed(2);
        return Number(precision);
    }
    

    const tax = formatNumber(total * 0.05);

    
    return (
        <div className="cart-inner">
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <table>
                <tbody>
                    <tr>
                        <td>Items:</td>
                        <td>${formatNumber(total)}</td>
                    </tr>
                    <tr>
                        <td>Shipping &amp; Handling:</td>
                        <td>${shipping}</td>
                    </tr>
                    <tr>
                        <td>Total before tax:</td>
                        <td>${formatNumber(total + shipping)}</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax:</td>
                        <td>${tax}</td>
                    </tr>
                    <tr className="total-row">
                        <td>Order Total:</td>
                        <td>${formatNumber(total + shipping + tax)}</td>
                    </tr>
                </tbody>
            </table>     
            { props.children}  
        </div>
    );
};

export default Cart;