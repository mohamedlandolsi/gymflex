import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Details({ exercise }) {
  console.log(exercise);
  return (
    <GuestLayout>
      <Head title={exercise.name} />
      <h1>{exercise.name}</h1>
    </GuestLayout>
  );
}
