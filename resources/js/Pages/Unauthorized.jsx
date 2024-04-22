import { Link } from "@inertiajs/react";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Unauthorized Access</h1>
        <p className="py-6">You are not authorized to view this page.</p>
        <Link href={route("home")} className="btn btn-accent">
          Home Page
        </Link>
      </div>
    </div>
  );
}
