import { IMeta, IBookingData } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BOOKING_URL = "/bookings";

export const addToCartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all building
    getBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBookingData[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    // get single building
    getBooking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    // create a new building
    addBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/create-booking`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // update existing building
    acceptBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // delete existing building
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAcceptBookingMutation,
  useAddBookingMutation,
  useDeleteBookingMutation,
  useGetBookingQuery,
  useGetBookingsQuery,
} = addToCartApi;
