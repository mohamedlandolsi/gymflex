import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, exercise }) {
  const { data, setData, post, errors, reset, processing } = useForm({
    image: exercise.image || "",
    name: exercise.name || "",
    description: exercise.description || "",
    sets: exercise.sets || "",
    rep_range: exercise.rep_range || "",
    muscle_group: exercise.muscle_group || "",
    equipment: exercise.equipment || "",
    _method: "PUT",
  });

  // processing will be used to make the submit button loads when the form is being submitted

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("exercises-admin.update", exercise.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit exercise {exercise.name}
          </h2>
        </div>
      }
    >
      <Head title="Create new exercise" />

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
                    htmlFor="exercise_image_path"
                    value="Exercise Image"
                  />
                  <TextInput
                    id="exercise_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="exercise_name" value="Exercise Name" />
                  <TextInput
                    id="exercise_name"
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
                    htmlFor="exercise_description"
                    value="Exercise Description"
                  />
                  <TextAreaInput
                    id="exercise_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="sets" value="Number of sets" />
                  <TextInput
                    id="sets"
                    type="number"
                    name="sets"
                    value={data.sets}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("sets", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="rep_range" value="Repition range" />
                  <SelectInput
                    id="rep_range"
                    name="rep_range"
                    value={data.rep_range}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("rep_range", e.target.value)}
                  >
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-15">11-15</option>
                    <option value="16-20">16-20</option>
                    <option value="21-25">21-25</option>
                  </SelectInput>
                  <InputError message={errors.rep_range} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="muscle_group"
                    value="Muscle group targeted"
                  />
                  <SelectInput
                    id="muscle_group"
                    name="muscle_group"
                    value={data.muscle_group}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("muscle_group", e.target.value)}
                  >
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="arms">Arms</option>
                    <option value="legs">Legs</option>
                    <option value="core">Core</option>
                  </SelectInput>
                  <InputError message={errors.muscle_group} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="equipment" value="Equipment" />
                  <SelectInput
                    id="equipment"
                    name="equipment"
                    value={data.equipment}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("equipment", e.target.value)}
                  >
                    <option value="barbell">Barbell</option>
                    <option value="dumbbell">Dumbbell</option>
                    <option value="kettlebell">Kettlebell</option>
                    <option value="bodyweight">Body Weight</option>
                    <option value="machine">Machine</option>
                    <option value="cable">Cable</option>
                  </SelectInput>
                  <InputError message={errors.equipment} className="mt-2" />
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                    <Link href={route("exercises-admin.index")}>Cancel</Link>
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
