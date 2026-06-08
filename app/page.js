'use client'

import { useState } from "react"
import { movies } from "@/lib/data"
import MovieCard from "@/components/MovieCard"

const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Thriller', 'Fantasy', 'Horror', 'Comedy']

export default function HomePage(){
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')

  const filtered = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = activeGenre === 'All' || movie.genre == activeGenre
    return matchesSearch && matchesGenre
  })

  return(
    <div className="px-8 py-10" style={{ minHeight: "100vh" }} >

      <h1
        className="text-5xl mb-8 text-centre"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "3px"}}
        >
          NOW SHOWING
      </h1>

      <input
        types="text"
        placeholder="Search Movies... "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-lg mb-6 text-white outline-none"
        style={{ backgroundColor: "#13131a", border: "1px solid #333" }}
      />

      <div className="flex gap-3 flex-wrap mb-8">
        {genres.map(genre => (
          <button
            key = {genre}
            onClick={() => setActiveGenre(genre)}
            className="px-4 py-3 rounded-full text-sm font-medium transition-colors"
            style={{
              background: activeGenre === genre ? "#e63946" : "#13131a",
              border: "1px solid #333"
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No movies found</p>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(movie => (
            <MovieCard key = {movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}