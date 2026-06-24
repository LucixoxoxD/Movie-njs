'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      alert('Please fill in all fields')
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md p-8 rounded-xl flex flex-col gap-4"
        style={{ backgroundColor: "#13131a", border: "1px solid #222" }}
      >
        <h1
          className="text-4xl mb-2 text-center"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "2px" }}
        >
          LOGIN
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg text-white outline-none"
          style={{ backgroundColor: "#0a0a0f", border: "1px solid #333" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg text-white outline-none"
          style={{ backgroundColor: "#0a0a0f", border: "1px solid #333" }}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg font-medium mt-2"
          style={{ backgroundColor: "#e63946" }}
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}