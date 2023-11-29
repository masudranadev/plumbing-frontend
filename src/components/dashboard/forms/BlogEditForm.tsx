"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { modules } from "@/utils/modules";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

const items = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Blog",
    link: "/dashboard/blog",
  },
  {
    label: "Update Blog",
    link: "",
  },
];

const BlogEditForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading: blogLoading } = useBlogQuery(id);

  const defaultValues = {
    title: data?.title,
  };

  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const router = useRouter();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

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
      setLoading(true);
      let thumbnail;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMBB_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const responseData = await response.json();
          thumbnail = responseData.data.display_url;
        } else {
          console.error("Image upload failed");
        }
      }

      data["content"] = content;
      data["thumbnail"] = thumbnail ? thumbnail : data?.thumbnail;
      console.log(data);

      //akhane api call hobe
      const res: any = await updateBlog({ id, body: data });
      console.log(res);

      if (res.data as any) {
        router.push("/dashboard/blog");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blog Updated Successfully :)",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  if (blogLoading) return null;
  return (
    <div className="p-5">
      <BreadCrumbs items={items} />
      <div className="w-full border-b-2 border-slate-300 mt-3 mb-3">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Update Blog</h2>
      </div>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="bg-slate-50 rounded p-5">
          <div className="">
            <p className="text-sm leading-6 text-gray-600">
              Provide all information for blog
            </p>
            <div className="col-span-2">
              <label htmlFor="image">Thumbnail</label>
              <div className="mt-1 flex gap-5 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-3 w-full md:w-1/2">
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
                {data?.thumbnail && (
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <Image
                        width={100}
                        height={100}
                        alt="image"
                        src={imagePreview ? imagePreview : data?.thumbnail}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-3 w-full md:w-1/2 mt-3">
                <div className="w-full">
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

          <div className="mt-3">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Blog post Content
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 h-auto mt-2">
              <div className="col-span-6">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  onChange={handleContentChange}
                  defaultValue={data?.content}
                  className="rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <LoadingButton
              type="submit"
              className="btn btn-accent mt-3 w-full"
              value="updating..."
            >
              {loading || isLoading ? <SmallSpinner /> : "Update"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BlogEditForm;
