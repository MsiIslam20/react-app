import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Order = () => {

    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory()

    const handleProceedCheckOut = () => {
        history.push("/shipment")
    }

    const removeProduct = (pdKey) => {
        const newCart = cart.filter(pd => pd.key !== pdKey);
        setCart(newCart);
        removeFromDatabaseCart(pdKey);
    }

    useEffect(() => {
        //carts
        const saveCart =  getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        // console.log(cartProduct);
        setCart(cartProduct);
        
    }, [])
    let thanks;
    if(orderPlaced){
        thanks = <img src={happyImage} alt=""/>
    }
    return (
        <div>
            <div className="product-container">
                <div className="shop-container">
                    <div>
                            {
                                cart.map( pd => <ReviewItem 
                                    key={pd.key}
                                    product={pd}
                                    removeProduct= {removeProduct}>
                                    </ReviewItem>)
                            }
                        {thanks}
                    </div>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckOut} className="btn">Proceed to CheckOut</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Order;