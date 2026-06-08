import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#13131a", border: "1px solid #222" }}
    >
      <div
        className="flex items-center justify-center text-8xl"
        style={{ backgroundColor: "#1a1a2e", height: "200px" }}
      >
        {movie.posterEmoji}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2
          className="text-xl"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "1px" }}
        >
          {movie.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{movie.genre}</span>
          <span>•</span>
          <span>{movie.language}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-sm">⭐ {movie.rating}</span>
            <span className="text-green-400 text-sm">${movie.price}</span>
          </div>

          <Link
            href={`/movies/${movie.id}`}
            className="text-sm px-4 py-2 rounded font-medium"
            style={{ backgroundColor: "#e63946" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}