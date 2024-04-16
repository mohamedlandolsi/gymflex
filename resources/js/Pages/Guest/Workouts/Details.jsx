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
      <div className="hero p-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={workout.image_path}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{workout.name}</h1>
            <p className="py-6">{workout.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pb-5">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Created at</div>
            <div className="stat-value text-primary">{workout.created_at}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Last updated at</div>
            <div className="stat-value text-secondary">
              {workout.updated_at}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  {workout.createdBy.profile_photo_path && (
                    <img src={workout.createdBy.profile_photo_path} />
                  )}
                </div>
              </div>
            </div>
            <div className="stat-title">Created by</div>
            <div className="stat-value text-accent">
              {workout.createdBy.name}
            </div>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <div className="flex flex-col justify-center items-center py-10 gap-7">
        <div className="text-5xl font-bold pb-8">Exercises</div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Exercise Name</h2>
            <p>Exercise description</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Exercise Name</h2>
            <p>Exercise description</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Exercise Name</h2>
            <p>Exercise description</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Exercise Name</h2>
            <p>Exercise description</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>

        {/* {workout.exercises.map((exercise) => (
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Exercise Name</h2>
              <p>Exercise description</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </GuestLayout>
  );
}
