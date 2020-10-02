import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch("https://calm-garden-46705.herokuapp.com/addProduct", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;