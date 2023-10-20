import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Generated by Masud Rana",
};
const LogingPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LogingPage;
