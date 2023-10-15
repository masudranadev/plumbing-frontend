import { IMeta, IFaq } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const FAQ_URL = "/faqs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all building
    faqs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FAQ_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaq[], meta: IMeta) => {
        return {
          faqs: response,
          meta,
        };
      },
      providesTags: [tagTypes.faq],
    }),
    // get single building
    faq: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    // create a new building
    addFaq: build.mutation({
      query: (data) => ({
        url: FAQ_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // update existing building
    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // delete existing building
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useFaqQuery,
  useFaqsQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = blogApi;
