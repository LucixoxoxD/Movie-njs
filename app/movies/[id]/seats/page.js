'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { movies, seatLayout } from "@/lib/data"

export default function SeatsPage() {
  const params = useParams()
  const router = useRouter()
  const movie = movies.find(m => m.id === params.id)
  const [selectedSeats, setSelectedSeats] = useState([])

  if (!movie) {
    return <div className="text-center py-20 text-gray-500">Movie not found.</div>
  }

  const toggleSeat = (seatLabel, isBooked) => {
    if (isBooked) return
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatLabel))
    } else {
      setSelectedSeats([...selectedSeats, seatLabel])
    }
  }

  const totalPrice = (selectedSeats.length * movie.price).toFixed(2)

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return
    const query = new URLSearchParams({
      movieId: movie.id,
      seats: selectedSeats.join(','),
      total: totalPrice
    }).toString()
    router.push(`/checkout?${query}`)
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">

      <h1
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "2px" }}
      >
        SELECT SEATS
      </h1>
      <p className="text-gray-400 mb-8">{movie.title}</p>

      <div
        className="text-center text-sm text-gray-500 py-2 mb-6 rounded"
        style={{ backgroundColor: "#13131a" }}
      >
        SCREEN
      </div>

      <div className="flex flex-col gap-3 mb-10">
        {seatLayout.map(row => (
          <div key={row.row} className="flex items-center gap-2">
            <span className="text-gray-500 text-sm w-4">{row.row}</span>
            <div className="flex gap-2">
              {row.seats.map(seatNum => {
                const seatLabel = `${row.row}${seatNum}`
                const isBooked = row.booked.includes(seatNum)
                const isSelected = selectedSeats.includes(seatLabel)

                return (
                  <button
                    key={seatNum}
                    onClick={() => toggleSeat(seatLabel, isBooked)}
                    className="w-8 h-8 rounded text-xs font-medium"
                    style={{
                      backgroundColor: isBooked ? "#333" : isSelected ? "#e63946" : "#13131a",
                      border: "1px solid #444",
                      cursor: isBooked ? "not-allowed" : "pointer",
                      color: isBooked ? "#666" : "#fff"
                    }}
                  >
                    {seatNum}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#13131a", border: "1px solid #444" }}></div>
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#e63946" }}></div>
          <span className="text-gray-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#333" }}></div>
          <span className="text-gray-400">Booked</span>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-6 py-4 rounded-xl"
        style={{ backgroundColor: "#13131a" }}
      >
        <div>
          <p className="text-sm text-gray-400">Selected: {selectedSeats.join(', ') || 'None'}</p>
          <p className="text-xl font-bold text-green-400">${totalPrice}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="px-6 py-3 rounded font-medium text-sm"
          style={{
            backgroundColor: selectedSeats.length > 0 ? "#e63946" : "#555",
            cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed"
          }}
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
  )
}