import { configureStore } from "@reduxjs/toolkit";
import  authReducer from '../features/authSlice'
import productReducer from '../features/productSlice'
import orderReducer from '../features/orderSlice'
const store = configureStore({
    reducer:{   
       auth:authReducer,
       product: productReducer,
       orders: orderReducer
    },
});

export default store