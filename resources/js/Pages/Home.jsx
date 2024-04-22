import Hero from "@/Components/Home/Hero";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth }) {
  console.log(auth);

  return (
    <GuestLayout user={auth.user}>
      <Head title="Home Page" />
      <Hero />
    </GuestLayout>
  );
}
