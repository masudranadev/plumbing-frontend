import { IMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    contentType?: string;
  },
  unknown,
  unknown
> => async ({ url, method, data, params, contentType }) => {
  try {
    const result = await axiosInstance({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    });
    //@ts-ignore
    return { data: result.data, error: result?.message };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
