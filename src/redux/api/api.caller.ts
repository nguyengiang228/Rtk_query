import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponseInfo } from 'interfaces';
import customBaseQuery from './fetchBase';
import { IUser, IUserData } from 'interfaces/user';

export const apiCaller = createApi({
  reducerPath: 'apiCaller',
  refetchOnMountOrArgChange: 30,
  baseQuery: customBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    /**
     * truyền kiểu dữ liệu cho các endpoint <'response trả về', 'kiểu tuyền vào'>
     */
    getExample: builder.query<IUser[], void>({
      query() {
        return {
          url: `/users`,
          method: 'GET'
        };
      },
      providesTags: [{ type: 'Posts' }]
    }),

    /**
     * Dùng mutation đối với các trường hợp POST, PUT, DELETE
     * POST là response trả về và Omit<POST, 'id'> là body gửi lên
     */
    addExample: builder.mutation<IUser, Omit<IUser, 'id'>>({
      query(body) {
        return {
          url: `/users`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [{ type: 'Posts' }]
    }),

    getUsers: builder.query<IUser, number>({
      query(id) {
        return `users/${id}`;
      }
    }),

    updateExample: builder.mutation<IUser[], { id: number; body: IUser }>({
      query(data) {
        return {
          url: `/users/${data.id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: [{ type: 'Posts' }]
    }),
    deleteExample: builder.mutation<IUser, { id: number }>({
      query(data) {
        return {
          url: `/users/${data.id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [{ type: 'Posts' }]
    })
  })
});

export const {
  useGetExampleQuery,
  useAddExampleMutation,
  useUpdateExampleMutation,
  useLazyGetExampleQuery,
  useDeleteExampleMutation
} = apiCaller;
