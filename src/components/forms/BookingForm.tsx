"use client";
import FormInput from "./FormInput";
import Form from "./Form";
import FormTextArea from "./FormTextArea";
import { useServiceQuery, useServicesQuery } from "@/redux/api/serviceApi";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import LoadingButton from "../common/LoadingButton";
import SmallSpinner from "../common/SmallSpinner";
import {useState} from "react";

const BookingForm = ({ serviceId }: { serviceId: string }) => {
    const [loading, setLoading] = useState<boolean>(false);
  const { data: service } = useServiceQuery(serviceId);
  const { userId } = getUserInfo() as any;
  const { data: user } = useProfileQuery(userId);
  console.log({ user, service });
  console.log(service?.title)

  const defaultValues = {
    fullName: user?.profile?.fullName,
    email: user?.profile?.email,
    address: user?.profile?.address,
    contactNo: user?.profile?.contactNo,
    title: service?.title,
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="bg-white max-w-[1020px] mx-auto my-24">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              Book now Carefully
            </h2>
          </div>
        </div>
      </div>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="p-10 shadow-md">
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="fullName"
                label="Your Name"
                type="text"
                placeholder="Enter your name"
                id="username"
                readonly={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white read-only"
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormInput
                name="email"
                label="Your Email"
                type="email"
                placeholder="Enter your email"
                id="email"
                readonly={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="contactNo"
                label="Phone Number"
                type="text"
                placeholder="Enter your number"
                id="contactno"
                readonly={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="address"
                label="Address"
                type="text"
                placeholder="Enter your address"
                id="address"
                readonly={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2">
            <FormInput
                name="title"
                label="Service"
                type="text"
                placeholder="Enter your service"
                id="title"
                readonly={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="mt-4">
            <LoadingButton
              type="submit"
              className="btn btn-accent mt-3 w-full"
              value="Login"
            >
              {loading ? <SmallSpinner /> : "Book"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
