"use client";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useUserSigninMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [check, setCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [userSignin] = useUserSigninMutation();
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await userSignin(data).unwrap();
      if (res?.token) {
        setLoading(false);
        router.push("/home");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        storeUserInfo({ accessToken: res?.token });
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#F9FAFB]">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-[400px] mx-auto ring bg-white shadow rounded">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={100}
            height={100}
            className="mx-auto h-10 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9USNOvH6lyjuI3qWA7NTqtJjA01Q8BPKiM3KhRitWGhbtligN3XKpUHsjLN_idjCj3U&usqp=CAU"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form submitHandler={handleSubmit}>
            <div className="space-y-5">
              <div>
                <div className="mt-2">
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <FormInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between my-5">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!check}
                        onChange={() => setCheck(!check)}
                        className="checkbox"
                      />
                      <span className="label-text ml-5">Remember me</span>
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <LoadingButton
                type="submit"
                className="btn btn-accent mt-3 w-full"
                value="Login"
                disabled={check}
              >
                {loading ? <SmallSpinner /> : "Login"}
              </LoadingButton>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            not have your account?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
