import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import DaisyLabel from "@/Components/DaisyLabel";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      profile_photo_path: user.profile_photo_path,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium">Profile Information</h2>

        <p className="mt-1 text-sm text-neutral-content">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <DaisyLabel htmlFor="name" value="Name" />
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs mt-1"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <DaisyLabel htmlFor="email" value="Email" />
          <input
            id="email"
            type="text"
            className="input input-bordered w-full max-w-xs mt-1"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="email"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div>
          <InputLabel htmlFor="photo" value="Photo" />

          <div className="mt-1 flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={user.profile_photo_path}
              alt=""
            />

            <div className="ml-4">
              <label
                htmlFor="photo"
                className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-800"
              >
                <span>Change</span>
                <input
                  id="photo"
                  name="photo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      setData("profile_photo_path", e.target.result);
                    };

                    reader.readAsDataURL(file);
                  }}
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
