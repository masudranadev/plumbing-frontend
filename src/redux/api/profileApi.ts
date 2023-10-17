import { IMeta, IUserProfile } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PROFILE_URL = "/profile";
// const accessToken = getToken() as string;
export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: (id) => {
        // console.log(data)
        return {
          url: `${PROFILE_URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IUserProfile, meta: IMeta) => {
        return {
          profile: response,
          meta,
        };
      },
      providesTags: [tagTypes.profile, tagTypes.user],
    }),
  }),
});

export const { useProfileQuery } = profileApi;
