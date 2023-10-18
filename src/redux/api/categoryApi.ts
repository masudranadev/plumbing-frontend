import { IMeta, IFaq, ICategory } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all categories
    categories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICategory[], meta: IMeta) => {
        return {
          categories: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),
    // get single category
    category: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    // create a new category
    addCategory: build.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/create-category`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // update existing category
    updateCategory: build.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // delete existing category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
