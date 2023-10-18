"use client";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import Swal from "sweetalert2";

const CategoryAddForm = () => {
  const [addCategory, { isLoading: loading }] = useAddCategoryMutation();

  const handleSubmit = async (data: any) => {
    const res: any = await addCategory(data);
    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category Created Successfully :)",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container xl:w-[80%] px-20 py-5 mt-5 ring rounded">
      <Form submitHandler={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Category
            </h2>
            <div className="col-span-2 flex gap-7">
              <div className="col-span-3 w-1/2">
                <div className="mt-2 w-full">
                  <FormInput
                    type="text"
                    name="title"
                    placeholder="Write title..."
                    label="Title"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <div className="mt-4">
            <LoadingButton type="submit" className="btn btn-accent mt-3 w-full">
              {loading ? <SmallSpinner /> : "Add Category"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CategoryAddForm;
