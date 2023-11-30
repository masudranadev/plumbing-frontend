"use client";

import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Image from "next/image";
import SelectFormField, {
  SelectOptions,
} from "@/components/forms/SelectFormField";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import Loading from "@/components/common/Loading";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "service",
    link: "/dashboard/service",
  },
  {
    label: "Add Service",
    link: "",
  },
];
const ServiceAddForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [addService, { isLoading: loading }] = useAddServiceMutation();
  const query: Record<string, any> = {};
  const { data, isLoading } = useCategoriesQuery({ ...query });
  const router = useRouter();

  const options = data?.categories?.map((category) => {
    return {
      label: category.title,
      value: category.id,
    };
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (!image) {
        console.error("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMBB_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.data) {
          data.image = responseData.data.display_url;
          data.price = Number(data.price);
          //akhane api call hobe

          const res: any = await addService(data);
          if (res.data as any) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Service Created Successfully :)",
              showConfirmButton: false,
              timer: 1500,
            });
            router.push("/dashboard/service");
          } else {
            toast.error("There was an error!");
          }
        }
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5">
      <BreadCrumbs items={items} />
      <div className="w-full border-b-2 border-slate-300 mt-3 mb-3">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Add Service</h2>
      </div>
      <Form submitHandler={handleSubmit}>
        <div className="shadow-md px-5 py-2 bg-slate-50 rounded">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Thumbnail
          </label>
          <div className="mt-2 flex w-1/2 gap-5 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
              required
            />
            {imagePreview && (
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <Image
                    width={100}
                    height={100}
                    alt="image"
                    src={imagePreview}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="price"
                label="Price"
                type="number"
                placeholder="Enter price..."
                id="price"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormInput
                name="title"
                label="Title"
                type="text"
                placeholder="Enter title..."
                id="title"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <SelectFormField
              name="categoryId"
              options={options as SelectOptions[]}
              label="Category"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <FormTextArea
            name="description"
            placeholder="Write description..."
            id="description"
            rows={3}
            label="Description"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
          />
          <div className="mt-4">
            <LoadingButton
              type="submit"
              className="btn btn-accent mt-3 w-full"
              value="Login"
            >
              {loading ? <SmallSpinner /> : "Add Service"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ServiceAddForm;
