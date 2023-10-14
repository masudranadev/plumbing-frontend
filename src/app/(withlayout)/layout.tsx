import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
};

export default DashboardLayout;
