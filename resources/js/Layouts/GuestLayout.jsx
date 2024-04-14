import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";

export default function GuestLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
