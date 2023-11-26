"use client";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import { useVerifyEmailMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const EmailVerifyForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [verifyEmail, { isLoading: loading }] = useVerifyEmailMutation();

  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const data = {
        email,
      };
      const res: any = await verifyEmail(data);
      if (res.error) {
        setError(res.error);
      } else {
        setError("");
      }
      if (res?.data?.token) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "check your email for veriry!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#F9FAFB] px-2">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-[400px] mx-auto ring bg-white shadow rounded">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Do you want to reset password provide your email?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error && (
                <small className="text-red-500 block mt-4">{error}</small>
              )}
            </div>

            <div className="mt-4">
              <LoadingButton
                type="submit"
                className="btn btn-accent mt-3 w-full"
                value="Login"
              >
                {loading ? <SmallSpinner /> : "submit"}
              </LoadingButton>
            </div>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500">
            Not have your account?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              signup
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed left-10 top-10">
        <Link className="btn" href={"/"}>
          <ArrowLeftIcon className="w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default EmailVerifyForm;
