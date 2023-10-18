import { IService, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SERVICE_URL = "/services";

export const buildingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all services
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    // get single service
    service: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    // get services by category id
    getServicesByCategoryId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/category/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    // create a new service
    addService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/create-service`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // update existing service
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // delete existing service
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useServicesQuery,
  useServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,

  useGetServicesByCategoryIdQuery
} = buildingApi;
