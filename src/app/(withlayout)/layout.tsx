"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/ui/Footer";
import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const Navbar = dynamic(() => import("../../components/ui/Navbar"), {
    ssr: false,
  });

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the time as needed
  }, []);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </section>
  );
};

export default DashboardLayout;
