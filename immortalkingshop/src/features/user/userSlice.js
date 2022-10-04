import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: builder => ({
    registerUser: builder.mutation({
        query: user => ({
            url: '/users',
            method: 'POST',
            body: user,
        })
    }),
    loginUser: builder.mutation({
        query: user => ({
            url: `/users/login`,
            method: 'POST',
            body: user,
        })
    })
  })
})

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi

