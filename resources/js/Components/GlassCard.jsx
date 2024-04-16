import { Link } from "@inertiajs/react";

export default function GlassCard({
  id,
  title,
  description,
  image,
  buttonText,
  routeName,
}) {
  return (
    <div className="card w-86 glass">
      <figure className="avatar placeholder mt-5">
        {image ? (
          <div className="w-48 rounded">
            <img src={image} alt={title} />
          </div>
        ) : (
          <div className="bg-neutral text-neutral-content rounded w-48">
            <span className="text-3xl">{title}</span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={route(routeName, id)}>
            <button className="btn btn-accent">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
