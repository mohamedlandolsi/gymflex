import GlassCard from "@/Components/GlassCard";
import Pagination from "@/Components/Pagination";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Index({ workouts, queryParams = null, auth }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("workouts.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("workouts.index"), queryParams);
  };

  return (
    <GuestLayout user={auth.user}>
      <Head title="Workouts" />
      <div className="mx-20 my-5">
        <div className="hero min-h-fit bg-base-100 mb-5">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Workouts</h1>
            </div>
          </div>
        </div>
        <div className="py-5">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Workout Name"
              onBlur={(e) => searchFieldChanged("name", e.target.value)}
              onKeyPress={(e) => onKeyPress("name", e)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workouts.data.map((workout) => (
            <GlassCard
              key={workout.id}
              id={workout.id}
              title={workout.name}
              description={workout.description}
              image={workout.image_path}
              buttonText={"More details"}
              routeName="workouts.show"
            />
          ))}
        </div>
        <Pagination links={workouts.meta.links} />
      </div>
    </GuestLayout>
  );
}
