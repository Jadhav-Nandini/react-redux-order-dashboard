

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: JSON.parse(localStorage.getItem("products")) ||
        [
            { id: 1, name: "Laptop", price: 50000, quantity: 5 },
            { id: 2, name: "Mobile Phone", price: 20000, quantity: 10 },
            { id: 3, name: "Headphones", price: 1500, quantity: 20 },
        ]
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action)=>{
            const newProduct = {
                id: Date.now(),
                userId: action.payload.userId, 
                ...action.payload,
                
            };
            state.products.push(newProduct);
            localStorage.setItem("products", 
                JSON.stringify(state.products)
            );
        },
    }
})

export const {addProduct} = productSlice.actions
export default productSlice.reducer