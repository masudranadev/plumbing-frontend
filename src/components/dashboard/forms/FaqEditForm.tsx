"use client";

import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";
import Loading from "@/components/common/Loading";

const FaqEditForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateFaq] = useUpdateFaqMutation();
  const { data, isLoading } = useFaqQuery(id);
  const router = useRouter();

  const defaultValues = {
    question: data?.question,
    answer: data?.answer,
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    const res: any = await updateFaq({id, body: data});
    if (res.data as any) {
      Swal.fire("faq updated Successfully!");
      router.push("/dashboard/faq");
      setLoading(false);
    } else {
      toast.error("There was an error!");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-white max-w-[1020px] mx-auto my-24">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              Faq add
            </h2>
          </div>
        </div>
      </div>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="p-10 shadow-md">
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="question"
                label="Question"
                type="text"
                placeholder="Enter Question..."
                id="question"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <FormTextArea
            name="answer"
            placeholder="Write Answer..."
            id="answer"
            rows={3}
            label="Answer"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
          />
          <div className="mt-4">
            <LoadingButton
              type="submit"
              className="btn btn-accent mt-3 w-full"
              value="Login"
            >
              {loading ? <SmallSpinner /> : "Update Faq"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FaqEditForm;
