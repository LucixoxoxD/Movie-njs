'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { movies } from "@/lib/data"
import { Suspense } from "react"

function ConfirmationContent() {
  const searchParams = useSearchParams()

  const movieId = searchParams.get('movieId')
  const seats = searchParams.get('seats')
  const total = searchParams.get('total')
  const name = searchParams.get('name')
  const email = searchParams.get('email')

  const movie = movies.find(m => m.id === movieId)

  if (!movie) {
    return <div className="text-center py-20 text-gray-500">No booking found.</div>
  }

  const bookingId = "BK" + Math.floor(Math.random() * 9000 + 1000)

  return (
    <div className="max-w-lg mx-auto px-8 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-5xl mb-2" style={{ fontFamily: "var(--font-heading)", letterSpacing: "2px" }}>
        BOOKING CONFIRMED
      </h1>
      <p className="text-gray-400 mb-8">Thank you, {name}! Your tickets are booked.</p>
      <div className="rounded-xl p-6 text-left flex flex-col gap-3 mb-8" style={{ backgroundColor: "#13131a", border: "1px solid #222" }}>
        <div className="text-4xl text-center mb-2">{movie.posterEmoji}</div>
        <h2 className="text-2xl text-center" style={{ fontFamily: "var(--font-heading)", letterSpacing: "1px" }}>{movie.title}</h2>
        <div className="border-t pt-4 mt-2 flex flex-col gap-2 text-sm" style={{ borderColor: "#333" }}>
          <div className="flex justify-between">
            <span className="text-gray-400">Booking ID</span>
            <span className="text-white font-medium">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Seats</span>
            <span className="text-white">{seats}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-white">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Paid</span>
            <span className="text-green-400 font-bold">${total}</span>
          </div>
        </div>
      </div>
      <Link href="/" className="px-8 py-3 rounded-lg font-medium" style={{ backgroundColor: "#e63946" }}>
        Back to Home
      </Link>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}