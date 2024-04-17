import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Details({ exercise }) {
  return (
    <GuestLayout>
      <Head title={exercise.name} />
      <div className="container px-6 pt-12 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold lg:text-4xl">
            {exercise.name}
          </h1>
          <p className="mt-6">{exercise.description}</p>
        </div>

        <div className="flex justify-center mt-10">
          <img
            className="object-cover w-full h-96 rounded-xl lg:w-4/5"
            src={exercise.image_path}
            alt={exercise.name}
          />
        </div>
      </div>

      <section>
        <div className="container px-6 py-10 mx-auto">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-2">
            <div className="flex flex-col items-center p-6 space-y-3 text-center bg-base-200">
              <span className="inline-block p-3">
                <div className="avatar">
                  <div className="w-10 rounded">
                    <img src="https://cdn-icons-png.flaticon.com/512/2284/2284099.png" />
                  </div>
                </div>
              </span>

              <h1 className="text-xl font-semibold capitalize ">
                Muscle group
              </h1>

              <p className="capitalize">
                {exercise.muscle_group ? exercise.muscle_group : "N/A"}
              </p>

              <a
                href="#"
                className="flex items-center -mx-1 text-sm text-blue-500 transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
              >
                <span className="mx-1">Read more about this muscle group</span>
                <svg
                  className="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center p-6 space-y-3 text-center bg-base-200">
              <span className="inline-block p-3">
                <div className="avatar">
                  <div className="w-10 rounded">
                    <img src="https://b.kisscc0.com/20190326/ppe/kisscc0-black-white-m-weight-training-weights-5c9a727dba1490.4482126215536257257622.png" />
                  </div>
                </div>
              </span>

              <h1 className="text-xl font-semibold capitalize ">Equipment</h1>

              <p className="capitalize">
                {exercise.equipment ? exercise.equipment : "N/A"}
              </p>

              <a
                href="#"
                className="flex items-center -mx-1 text-sm text-blue-500 transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
              >
                <span className="mx-1">Read more about this equipment</span>
                <svg
                  className="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}
