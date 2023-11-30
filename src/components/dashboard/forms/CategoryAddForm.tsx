"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
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
    label: "Add Category",
    link: ""
  }
]
const CategoryAddForm = () => {
  const [addCategory, { isLoading: loading }] = useAddCategoryMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const res: any = await addCategory(data);
    if (res.data) {
      router.push("/dashboard/category");
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
    <div className="p-5">
      <BreadCrumbs items={items}/>
      <h2 className="text-3xl font-medium leading-7 pb-2 my-3 border-b-2 border-slate-300">
        Add Category
      </h2>
      <Form submitHandler={handleSubmit}>
        <div className="bg-slate-50 p-5 rounded">
          <FormInput
            type="text"
            name="title"
            placeholder="Write category..."
            label="Category"
            className="rounded-md w-[300px] border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
          />
          <div className="mt-5">
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
