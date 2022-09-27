import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: builder => ({
    getProductById: builder.query({
        query: (id) => `products/${id}`,
    }),
    getAllProducts: builder.query({
        query: () => 'products/',
    })
  })
})

export const { useGetProductByIdQuery, useGetAllProductsQuery } = productsApi

