import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/', 
    credentials: 'include', 
  }), // Reemplazar con tu base URL
  tagTypes: ['requests'],
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => 'requests/', // Endpoint para obtener todas las solicitudes
      providesTags: ['requests'],
    }),
    changeRequestStatus: builder.mutation({
      query: ({ requestId, newStatus }) => ({
        url: 'requests/change/',
        method: 'PATCH',
        body: { request_id: requestId, new_status: newStatus },
      }),
      invalidatesTags: ['requests'],
    }),
  }),
});

export const { useGetRequestsQuery, useChangeRequestStatusMutation } = requestsApi;
