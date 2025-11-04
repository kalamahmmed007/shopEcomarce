import { configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';
import orderReducer from './orderSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {

    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    order: orderReducer,
    profile: profileReducer,
  },
});