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
    }),
    getTopProducts: builder.query({
      query: (id) => `/products/top`
    })
  })
})

export const { useGetProductListQuery, useGetProductDetailsByIdQuery, useGetTopProductsQuery } = productSlice
