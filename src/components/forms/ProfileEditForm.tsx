"use client";

import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import { useProfileQuery } from "@/redux/api/profileApi";
import { useUpdateProfileMutation } from "@/redux/api/userApi";

const ProfileEditForm = ({ id }: { id: string }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data, isLoading } = useProfileQuery(id);
  const defaultValues = {
    fullName: data?.profile?.fullName,
    email: data?.profile?.email,
    address: data?.profile?.address,
    contactNo: data?.profile?.contactNo,
  };
  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();
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
    try {
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
          values.profileImg = responseData.data.display_url;
        }
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    const res: any = await updateProfile({ id, body: values });

    if (res.data as any) {
      toast.success("Profile updated Successfull :)");
      router.push(`/profile`);
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
              Profile update
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
                  alt={data?.profile?.fullName as string}
                  src={
                    imagePreview
                      ? imagePreview
                      : (data?.profile?.profileImg as string)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="fullName"
                label="Fullname"
                type="text"
                placeholder="write your name..."
                id="fullname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="write your email..."
                id="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="address"
                label="Address"
                type="text"
                placeholder="write your address..."
                id="address"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormInput
                name="contactNo"
                label="Contact No"
                type="text"
                placeholder="write your number..."
                id="contactno"
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
              {loading ? <SmallSpinner /> : "update profile"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProfileEditForm;
