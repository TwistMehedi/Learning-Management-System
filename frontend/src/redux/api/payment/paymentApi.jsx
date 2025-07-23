import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/payment/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addPayment: builder.mutation({
      query: ({course}) => ({
        url: `create-checkout-session`,
        method: "POST",
        body: {course},
      }),
    }),

    verifyEnroll: builder.mutation({
      query: ({sessionId}) => ({
        url: "verify-enroll",
        method: "POST",
        body: { sessionId },
      }),
    }),
  }),
});

export const { useAddPaymentMutation, useVerifyEnrollMutation } = paymentApi;
