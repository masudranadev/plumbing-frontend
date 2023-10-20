import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //user create
    userSignup: build.mutation({
      query: (signupData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //user login
    userSignin: build.mutation({
      query: (signinData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: signinData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //email verify
    verifyEmail: build.mutation({
      query: (verifyData) => ({
        url: `${AUTH_URL}/reset/password`,
        method: "POST",
        data: verifyData
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useUserSigninMutation, useUserSignupMutation, useVerifyEmailMutation } = authApi;
