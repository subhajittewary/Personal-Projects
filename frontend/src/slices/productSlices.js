import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
    name:"product",
    initialState:{
        productList:{}
    },
    reducers: {
        productListReq:(state)=>{
            state.productList.loading=true;
            state.productList.products=[];
        },
        productListFail:(state,action)=>{
            state.productList.loading= false;
            state.productList.error= action.payload; 
        }
    }
})

// Action creators are generated for each case reducer function
export const { productListReq,productListFail } = productSlice.actions;

export default productSlice.reducer;