"use client";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useBlogPostMutation } from "@/redux/api/blogApi";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BlogPostForm = () => {
    // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [blogPost, { isLoading: loading }] = useBlogPostMutation();
  console.log(content);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],

    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };
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
      data.content = content;
      console.log(data);

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
          data.thumbnail = responseData.data.display_url;
          //akhane api call hobe
          const res: any = await blogPost(data);
          if (res.data as any) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Admin Created Successfully :)",
              showConfirmButton: false,
              timer: 1500,
            });
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

  return (
    <div className="container xl:w-[80%] px-20 py-5 mt-5 ring rounded">
      <Form submitHandler={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Blog Post
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide all information for blog
            </p>

            <div className="col-span-2 flex gap-7">
              <div className="mt-2 flex gap-5 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-1/2">
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

          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Blog post Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <div className="mt-4">
            <LoadingButton
              type="submit"
              className="btn btn-accent mt-3 w-full"
              value="Login"
            >
              {loading ? <SmallSpinner /> : "তৈরী করুন"}
            </LoadingButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BlogPostForm;

