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
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Dashboard",
    link: "/dashbord",
  },
  {
    label: "Faq",
    link: "/dashboard/faq",
  },
  {
    label: "Update Faq",
    link: "",
  },
];
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
    const res: any = await updateFaq({ id, body: data });
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
    <div className="p-5">
      <BreadCrumbs items={items} />
      <h2 className="text-3xl font-medium border-b-2 border-slate-300 pb-2 mb-3">
        Update Faq
      </h2>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="p-5 bg-slate-50 rounded shadow-md">
          <div className="flex gap-3">
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
