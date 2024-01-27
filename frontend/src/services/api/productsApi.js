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
      query: () => `/products/top`
    }),
    createReview: builder.mutation({
      query:(data)=> ({
        url: `/products/${data.productId}/reviews`,
        body: data,
        method: "POST"
      }),
      invalidatesTags:['product']
    }),
    createProduct: builder.mutation({
      query:(product)=> ({
        url: `/products/add`,
        body: product,
        method: "POST"
      }),
      invalidatesTags: [{ type: 'CreateProduct', id: 'Create' }],
    })
  })
})

export const { useGetProductListQuery, useGetProductDetailsByIdQuery, useGetTopProductsQuery, useCreateReviewMutation, useCreateProductMutation } = productSlice
