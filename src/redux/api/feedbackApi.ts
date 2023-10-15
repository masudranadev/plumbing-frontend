import { IFeedbackData, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const FEEDBACK_URL = "/feedBacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all building
    feedbacks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFeedbackData[], meta: IMeta) => {
        return {
          feedbacks: response,
          meta,
        };
      },
      providesTags: [tagTypes.feedback],
    }),
    // get single building
    feedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
    // create a new building
    addFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/create-feed-back`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // update existing building
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // delete existing building
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
useFeedbacksQuery,
useFeedbackQuery,
useAddFeedbackMutation,
useUpdateFeedbackMutation,
useDeleteFeedbackMutation
} = feedbackApi;
