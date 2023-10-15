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

const ServiceEditForm = ({ id }: { id: string }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading } = useServiceQuery(id);
  const defaultValues = {
    price: data?.price,
    title: data?.title,
    description: data?.description,
  };
  const [updateService] = useUpdateServiceMutation();
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
    setLoading(true);
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
              Service updated
            </h2>
          </div>
        </div>
      </div>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="p-10 shadow-md">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Image
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
