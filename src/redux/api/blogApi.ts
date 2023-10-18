import { IMeta, IBlogPost } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BLOG_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all building
    blogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BLOG_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBlogPost[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    // get single building
    blog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    // create a new building
    blogPost: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/create-blog`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // update existing building
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // delete existing building
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useBlogPostMutation,
  useBlogsQuery,
  useBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
