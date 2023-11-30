"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const items =[
  {
    label: "Dashboard",
    link: "/dashboard",
  },{
    label: "Category",
    link: "/dashboard/category",
  },{
    label: "Update Category",
    link: ""
  }
]
const CategoryEditForm = ({ id }: { id: string }) => {
  const [updateCategory, { isLoading: loading }] = useUpdateCategoryMutation();
  const { data, isLoading } = useCategoryQuery(id);
  const router = useRouter();

  const defaultValues = {
    title: data?.title,
  };

  const handleSubmit = async (data: any) => {
    const res: any = await updateCategory({ id, body: data });
    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category updated Successfully :)",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard/category");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <BreadCrumbs items={items}/>
      <h2 className="text-3xl font-medium leading-7 border-b-2 border-slate-300 pb-2 my-3">
        Update Category
      </h2>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="p-5 bg-slate-50 rounded">
          <FormInput
            type="text"
            name="title"
            placeholder="Write Category..."
            label="Category"
            className="w-[300px] rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="mt-5">
            <LoadingButton type="submit" className="btn btn-accent">
              {loading ? <SmallSpinner /> : "Update Category"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CategoryEditForm;
