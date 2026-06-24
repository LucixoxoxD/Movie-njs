'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { movies } from "@/lib/data"

export default function MovieDetailPage() {
  const params = useParams()
  const movie = movies.find(m => m.id === params.id)
  const [selectedShowtime, setSelectedShowtime] = useState(null)

  if (!movie) {
    return (
      <div className="text-center py-20 text-gray-500">
        Movie not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      <div className="flex flex-col md:flex-row gap-10">

        <div
          className="flex items-center justify-center rounded-xl text-9xl flex-shrink-0"
          style={{ backgroundColor: "#13131a", width: "280px", height: "380px" }}
        >
          {movie.posterEmoji}
        </div>

        <div className="flex flex-col gap-4">
          <h1
            className="text-5xl"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "2px" }}
          >
            {movie.title}
          </h1>

          <div className="flex gap-3 flex-wrap text-sm text-gray-400">
            <span>{movie.genre}</span>
            <span>•</span>
            <span>{movie.language}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span className="text-yellow-400">⭐ {movie.rating}</span>
          </div>

          <p className="text-gray-300 leading-relaxed">{movie.description}</p>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">CAST</h3>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map(actor => (
                <span
                  key={actor}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#13131a", border: "1px solid #333" }}
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">SHOWTIMES</h3>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedShowtime(time)}
                  className="text-sm px-4 py-2 rounded"
                  style={{
                    backgroundColor: selectedShowtime === time ? "#e63946" : "#13131a",
                    border: "1px solid #333"
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl text-green-400 font-bold">${movie.price}</span>
            <Link
              href={selectedShowtime ? `/movies/${movie.id}/seats` : "#"}
              className="px-6 py-3 rounded font-medium text-sm"
              style={{
                backgroundColor: selectedShowtime ? "#e63946" : "#555",
                cursor: selectedShowtime ? "pointer" : "not-allowed"
              }}
            >
              {selectedShowtime ? "Book Now" : "Select a Showtime"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}