import { apiSlice } from "./apiSlice"

export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrderList: builder.query({
      query: () => { 
       return  `/orders/all/`
      }
    })
  })
})

export const { useGetOrderListQuery } = ordersSlice;
