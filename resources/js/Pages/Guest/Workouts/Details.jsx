import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Details({
  workout,
  exercises,
  queryParams = null,
  users,
}) {
  console.log(workout);
  return (
    <GuestLayout>
      <Head title={workout.name} />
      <h1>{workout.name}</h1>
    </GuestLayout>
  );
}
