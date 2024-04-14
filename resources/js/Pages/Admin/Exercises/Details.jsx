import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ExercisesTable from "./ExercisesTable";

export default function Details({
  auth,
  exercise,
  exercises,
  queryParams = null,
  users,
  success,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {exercise.name}
        </h2>
      }
    >
      <Head title={exercise.name} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={exercise.image_path}
                alt={exercise.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-1">
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">ID</label>
                    <p className="mt-1">{exercise.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Exercise name</label>
                    <p className="mt-1">{exercise.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Description</label>
                    <p className="mt-1">{exercise.description}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Sets</label>
                    <p className="mt-1">{exercise.sets}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Rep range</label>
                    <p className="mt-1">{exercise.rep_range}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">
                      Muscle group targeted
                    </label>
                    <p className="mt-1">{exercise.muscle_group}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Equipment</label>
                    <p className="mt-1">{exercise.equipment}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created by</label>
                    <p className="mt-1">{exercise.createdBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Creation date</label>
                    <p className="mt-1">{exercise.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated by</label>
                    <p className="mt-1">{exercise.updatedBy.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
