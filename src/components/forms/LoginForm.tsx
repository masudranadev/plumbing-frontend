"use client";
import LoadingButton from "@/components/common/LoadingButton";
import SmallSpinner from "@/components/common/SmallSpinner";
import { useUserSigninMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "../common/Modal";

const LoginForm = () => {
  const [check, setCheck] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userSignin, { isLoading: loading }] = useUserSigninMutation();

  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const data = {
        email,
        password,
      };
      const res: any = await userSignin(data);
      if (res.error) {
        setError(res.error);
        setCheck(false);
      } else {
        setError("");
      }
      if (res?.data?.token) {
        router.push("/home");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        storeUserInfo({ accessToken: res?.data?.token });
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9FAFB]">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-[400px] mx-auto ring bg-white shadow rounded my-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mx-auto">
          <Image
            width={50}
            height={50}
            className="mx-auto h-10 w-10 rounded-full ring"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9USNOvH6lyjuI3qWA7NTqtJjA01Q8BPKiM3KhRitWGhbtligN3XKpUHsjLN_idjCj3U&usqp=CAU"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Account
          </h2>
          <p className="text-center mt-2">
            Get Dashboard access Hits the Access Button
          </p>
          <div className="flex justify-center">
            <label htmlFor="open-modal" className="btn btn-sm btn-error text-slate-50 mt-3 flex justify-center">
              Access
            </label>
          </div>
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

              <div>
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="*****"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {error && (
                  <small className="text-red-500 pt-4 block">{error}</small>
                )}
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
                    <Link
                      href="/verify-email"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
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
      <Modal />
    </div>
  );
};

export default LoginForm;
