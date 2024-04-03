import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ExercisesTable from "./ExercisesTable";

export default function Index({ auth, exercises, users, queryParams = null }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Exercises
        </h2>
      }
    >
      <Head title="Exercises" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <ExercisesTable
                exercises={exercises}
                queryParams={queryParams}
                users={users}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
