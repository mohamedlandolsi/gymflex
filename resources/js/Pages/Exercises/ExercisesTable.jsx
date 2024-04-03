import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";

export default function ExercisesTable({ exercises, queryParams, users }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("exercises.index"), queryParams);
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

    router.get(route("exercises.index"), queryParams);
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Image</th>
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <TableHeading
                name="description"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Description
              </TableHeading>
              <TableHeading
                name="created_by"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Created by
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Creation date
              </TableHeading>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  placeholder="Exercise Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.createdBy}
                  onChange={(e) =>
                    searchFieldChanged("createdBy", e.target.value)
                  }
                >
                  <option value="">Everyone</option>
                  {users.data.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {exercises.data.map((exercise) => (
              <tr
                key={exercise.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-3 py-2">{exercise.id}</td>
                <td className="px-3 py-2">
                  <img src={exercise.image_path} alt={exercise.name} />
                </td>
                <td className="px-3 py2 text-nowrap">{exercise.name}</td>
                <td className="px-3 py2">{exercise.description}</td>
                <td className="px-3 py2">{exercise.createdBy.name}</td>
                <td className="px-3 py2 text-nowrap">{exercise.created_at}</td>
                <td className="px-3 py-2">
                  <Link
                    href={route("exercises.edit", exercise.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route("exercises.destroy", exercise.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={exercises.meta.links} />
    </>
  );
}
