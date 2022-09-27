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
    loginUser: builder.query({
        query: user => ({
            url: `/users/${user.email}`,
            method: 'GET',
            body: user,
        })
    })
  })
})

export const { useRegisterUserMutation } = usersApi

