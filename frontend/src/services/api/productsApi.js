import { apiSlice } from "./apiSlice"

export const productSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProductList: builder.query({
      query: (name) => { 
       return name ? `/products/search/${name}`: 'products'
      }
    }),
    getProductDetailsById: builder.query({
      query: (id) => `/products/${id}`
    })
  })
})

export const { useGetProductListQuery, useGetProductDetailsByIdQuery } = productSlice
