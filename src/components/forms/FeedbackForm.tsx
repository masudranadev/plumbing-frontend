"use client";

import { useServicesQuery } from "@/redux/api/serviceApi";
import Form from "./Form";
import SelectFormField, { SelectOptions } from "./SelectFormField";
import FormTextArea from "./FormTextArea";
import { getUserInfo, isLoggedin } from "@/services/auth.service";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import LoadingButton from "../common/LoadingButton";
import SmallSpinner from "../common/SmallSpinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FeedbackForm = () => {
  const { userId } = getUserInfo() as any;
  const arg = {};
  const { data, isLoading } = useServicesQuery({ ...arg });
  const [addFeedback, { isLoading: loading }] = useAddFeedbackMutation();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isLoggedin() as boolean;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const services = data?.services?.map((service: any) => {
    return {
      label: service?.title,
      value: service?.id,
    };
  });

  const onSubmit = async (data: any) => {
    if (userId) {
      data.userId = userId;
    }
    try {
      const res: any = await addFeedback(data);
      if (!!res.data) {
        toast.success("Your feedback submitted!!");
      } else {
        toast.error("There was an Occurence!");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (!!isLoading) {
    return <Loading />;
  }
  return (
      <div className="bg-white max-w-[1020px] mx-auto my-5 lg:my-24">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-2 md:mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Write your any feedback for us!!!
              </h2>
              <p className="text-base text-body-color">
                It is a long established fact that a reader will be distracted
                content of a page when looking.
              </p>
            </div>
          </div>
        </div>
        <Form submitHandler={onSubmit}>
          <div className="px-2 md:p-10 pb-5 shadow-md">
            <div className="flex gap-3 pt-5">
              <div className="w-full md:w-1/2">
                <SelectFormField
                  options={services as SelectOptions[]}
                  name="serviceId"
                  label="Select service"
                  id="service"
                  className="select select-none border border-gray-500"
                />
              </div>
            </div>
            <FormTextArea
              name="comment"
              placeholder="Write your comments"
              id="comments"
              rows={2}
              label="Comments"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
            />
            <FormTextArea
              name="suggestion"
              placeholder="please write your suggestion!"
              id="suggestion"
              rows={2}
              label="Suggestion"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
            />

            <div className="mt-4">
              <LoadingButton
                type="submit"
                className="btn btn-accent mt-3 w-full"
                value="Add Feedback"
              >
                {loading ? <SmallSpinner /> : "Add Feedback"}
              </LoadingButton>
            </div>
          </div>
        </Form>
      </div>
  );
};

export default FeedbackForm;
