import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";

export default function GuestLayout({ children, user, header }) {
  return (
    <div data-theme={localStorage.getItem("theme")}>
      <Navbar user={user} />
      {header && (
        <div className="hero min-h-fit bg-base-200 mb-5">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">{header}</h1>
            </div>
          </div>
        </div>
      )}
      {/* <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
        <h2 class="text-2xl font-bold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
          {header}
        </h2>
      </div> */}
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
