import { Link } from "@inertiajs/react";

export default function ExerciseCard({
  id,
  title,
  description,
  image,
  equipment,
  muscle_group,
  buttonText,
  routeName,
}) {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <Link href={route(routeName, id)}>
        <img
          className="object-cover object-center w-full h-56"
          src={image ? image : "https://via.placeholder.com/300"}
          alt={title}
        />
      </Link>

      <div className="flex items-center px-6 py-3 bg-gray-900">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2284/2284099.png"
          alt=""
          className="w-6 h-6 fill-current text-white"
        />

        <h1 className="mx-3 text-lg font-semibold text-white capitalize">
          {muscle_group}
        </h1>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>

        <p className="py-2 text-gray-700 dark:text-gray-400">{description}</p>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <img
            src="https://b.kisscc0.com/20190326/ppe/kisscc0-black-white-m-weight-training-weights-5c9a727dba1490.4482126215536257257622.png"
            alt=""
            className="w-6 h-6 fill-current text-gray-700 dark:text-gray-200"
          />
          <h1 className="px-2 text-sm">{equipment}</h1>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            href={route(routeName, id)}
            className="text-lg font-medium text-blue-600 dark:text-blue-300"
            tabindex="0"
            role="link"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
