import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderDetailsInterface, PaginatedResponse } from 'motherangela';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,

  }),
  endpoints: (builder) => ({

    getAllOrders: builder.query<PaginatedResponse<OrderDetailsInterface>,
          { page: number; pageSize: number; searchQuery: string }

        >({
          query: (params) => {
            if (params) {
              const { page, pageSize, searchQuery } = params;
              let queryString = '';
              queryString += `page=${page}`;
              queryString += `&pageSize=${pageSize}`;
              queryString += `&searchQuery=${searchQuery}`;
              return `/fetchAll/?${queryString}`;
            }
            return 'fetchAll';
          },
        }),
    addOrder: builder.mutation({
      query: (newUser) => ({
        url: 'add',
        method: 'POST',
        body: newUser,
      }),
    }),
    getOrder: builder.query({
      query: (id) => `detail/${id}`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `update${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `delete${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetAllOrdersQuery, useAddOrderMutation, useGetOrderQuery,
  useUpdateOrderMutation, useDeleteOrderMutation,
} = orderApi;
