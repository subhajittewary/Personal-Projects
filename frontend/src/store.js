import { combineReducers } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productUpdateReducer,
  productCreateReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  deleteUserReducer,
  userProfileReducer,
  updateUserReducer,
} from "./reducers/userReducers";
import userSliceReducer from './slices/userSlices';
import productSliceReducer from './slices/productSlices';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer,
} from "./reducers/orderReducers";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './services/api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : [];

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     shippingAddress: shippingAddressFromStorage,
//   },
//   userLogin: { userInfo: userInfoFromStorage },
// };
const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  productList: productListReducer,
  productDeatils: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  userList: userListReducer,
  userDelete: deleteUserReducer,
  userProfile: userProfileReducer,
  userUpdate: updateUserReducer,
  userSlice: userSliceReducer,
  productSlice: productSliceReducer
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch)

export default store;
