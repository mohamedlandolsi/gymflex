import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";

export default function GuestLayout({ children }) {
  return (
    <div data-theme={localStorage.getItem("theme")}>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
