"use client";

import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Service",
    link: "/dashboard/service",
  },
  {
    label: "Update Service",
    link: "",
  },
];

const ServiceEditForm = ({ id }: { id: string }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data, isLoading } = useServiceQuery(id);
  const defaultValues = {
    price: data?.price,
    title: data?.title,
    description: data?.description,
  };
  const [updateService, { isLoading: loading }] = useUpdateServiceMutation();
  const router = useRouter();

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

  const handleSubmit = async (values: any) => {
    values.price = parseFloat(values.price);

    try {
      if (!data?.image) {
        console.error("Please select an image.");
        return;
      }
      const formData = new FormData();
      formData.append("image", image as File);

      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMBB_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.data) {
          values.image = responseData.data.display_url;
        }
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    const res: any = await updateService({ id, body: values });
    console.log(res);

    if (res.data as any) {
      Swal.fire("service updated Successfully!");
      router.push("/dashboard/service");
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
      <div className="w-full border-b-2 border-slate-300 mt-3 mb-3">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Update Service</h2>
      </div>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="bg-slate-50 rounded p-5 shadow-md">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Thumbnail
          </label>

          <div className="mt-2 flex items-center w-1/2 justify-between gap-5 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <Image
                  width={100}
                  height={100}
                  alt={data?.title}
                  src={imagePreview ? imagePreview : data?.image}
                />
              </div>
            </div>
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
              {loading ? <SmallSpinner /> : "update Service"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ServiceEditForm;
