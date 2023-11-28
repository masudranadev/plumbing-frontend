import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const REVIEW_URL = "/reviewAndRating";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all services
    reviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: REVIEW_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          reviews: response,
          meta,
        };
      },
      providesTags: [tagTypes.review],
    }),
    // get single service
    review: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    // get services by service id
    getReviewsByServiceId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${REVIEW_URL}/service/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    // create a new review
    addReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/create-review`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // update existing service
    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // delete existing service
    deleteReview: build.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByServiceIdQuery,
  useReviewsQuery,
  useReviewQuery,
  useUpdateReviewMutation,
} = reviewApi;
