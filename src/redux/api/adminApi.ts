import { IMeta, IAddToCartData } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const ADMIN_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new admin
    createAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/create-admin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

  
  }),
});

export const {
useCreateAdminMutation
} = adminApi;
