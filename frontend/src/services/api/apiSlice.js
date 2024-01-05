import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: '/api',
            prepareHeaders: (headers, { getState }) => {
                console.log("getState",getState())
                const {
                    token,
                } = getState()?.userSlice?.userLogin?.userInfo;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
                return headers
            },
        }
    ),
    endpoints: builder => ({})
})

