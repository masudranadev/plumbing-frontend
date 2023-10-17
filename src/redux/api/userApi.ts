import { IMeta, IUserProfile } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUserProfile[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),

    // get single user profile
    user: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // update existing user role
    makeAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // update existing user role
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.profile],
    }),
  }),
});

export const {
  useUsersQuery,
  useMakeAdminMutation,
  useUserQuery,
  useUpdateProfileMutation,
} = userApi;
