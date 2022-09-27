import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productModalReducer from './features/productModal/productModalSlice';
import { usersApi } from './features/user/userSlice';
import { productsApi } from './features/products/productsSlice';


export default configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        productModal: productModalReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(productsApi.middleware)
})