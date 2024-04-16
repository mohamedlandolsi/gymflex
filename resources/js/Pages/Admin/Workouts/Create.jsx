import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, exercises }) {
  const { data, setData, post, errors, reset, processing } = useForm({
    image: "",
    name: "",
    description: "",
    exercises: [],
  });

  // processing will be used to make the submit button loads when the form is being submitted

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("workouts-admin.store"));
    console.log(data);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new workouts
          </h2>
        </div>
      }
    >
      <Head title="Create new workouts" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div>
                  <InputLabel
                    htmlFor="workout_image_path"
                    value="Worktou Image"
                  />
                  <TextInput
                    id="workout_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="workout_name" value="Workout Name" />
                  <TextInput
                    id="workout_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true} // This will focus the input field when the page loads
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="workout_description"
                    value="Workout Description"
                  />
                  <TextAreaInput
                    id="workout_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="exercises" value="Exercises" />
                  <SelectInput
                    id="exercises"
                    name="exercises"
                    // value={data.exercise_id}
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setData(
                        "exercises",
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    <option value="">Select an exercise</option>
                    {exercises.data.map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                    <Link href={route("workouts-admin.index")}>Cancel</Link>
                  </button>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
