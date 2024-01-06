import { apiSlice } from "./apiSlice";

import { getAuthorizationToken } from '../../utils/helper'
export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => ({ 
        url: `/users`
      })
      
    }),
    getUserProfile: builder.query({
        query: (id) => ({ 
          url: `/users/${id}`
        })
        
      })
  })
})

export const { useGetUsersListQuery,useGetUserProfileQuery } = usersSlice
