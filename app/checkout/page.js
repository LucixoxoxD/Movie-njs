'use client'

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { movies } from "@/lib/data"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const movieId = searchParams.get('movieId')
  const seats = searchParams.get('seats')
  const total = searchParams.get('total')

  const movie = movies.find(m => m.id === movieId)

  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in all fields')
      return
    }
    const query = new URLSearchParams({
      movieId,
      seats,
      total,
      name: form.name,
      email: form.email
    }).toString()
    router.push(`/confirmation?${query}`)
  }

  if (!movie) {
    return <div className="text-center py-20 text-gray-500">No booking data found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1
        className="text-4xl mb-8"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "2px" }}
      >
        CHECKOUT
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-lg font-medium mb-2">Your Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-white outline-none"
            style={{ backgroundColor: "#13131a", border: "1px solid #333" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-white outline-none"
            style={{ backgroundColor: "#13131a", border: "1px solid #333" }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-white outline-none"
            style={{ backgroundColor: "#13131a", border: "1px solid #333" }}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-medium mt-2"
            style={{ backgroundColor: "#e63946" }}
          >
            Confirm Booking
          </button>
        </div>

        <div
          className="w-full md:w-72 rounded-xl p-6 flex flex-col gap-3 h-fit"
          style={{ backgroundColor: "#13131a", border: "1px solid #222" }}
        >
          <h2 className="text-lg font-medium">Booking Summary</h2>

          <div className="text-4xl text-center py-4">{movie.posterEmoji}</div>

          <p
            className="text-xl"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "1px" }}
          >
            {movie.title}
          </p>

          <div className="text-sm text-gray-400 flex flex-col gap-1">
            <p>Seats: {seats}</p>
            <p>Duration: {movie.duration}</p>
          </div>

          <div
            className="border-t pt-3 mt-2 flex justify-between items-center"
            style={{ borderColor: "#333" }}
          >
            <span className="text-gray-400">Total</span>
            <span className="text-xl font-bold text-green-400">${total}</span>
          </div>
        </div>

      </div>
    </div>
  )
}