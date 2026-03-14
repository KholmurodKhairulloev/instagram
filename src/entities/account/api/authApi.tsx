import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_APP_API_URL;

if (!API_URL) {
  console.error("❌ Ошибка: VITE_APP_API_URL не задан в .env файле");
  throw new Error("Не задан API_URL");
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
	login: builder.mutation({
	query: (data) => ({
	  url: "/login",
	  method: "POST",
	  body: data,
	}),
 }),
 
    register: builder.mutation<{ message: string }, { userName: string; fullName: string; email: string; password: string; confirmPassword: string }>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
