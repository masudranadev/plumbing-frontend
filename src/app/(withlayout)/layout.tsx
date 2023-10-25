"use client";
import Loading from "@/components/common/Loading";
import Footer from "@/components/ui/Footer";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Navbar = dynamic(() => import("../../components/ui/Navbar"), {
  ssr: false,
});
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes.
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <Navbar />
          {children}
          <Footer />
        </section>
      )}
    </>
  );
};

export default DashboardLayout;
