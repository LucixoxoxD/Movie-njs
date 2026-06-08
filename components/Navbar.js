import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between px-8 py-4"
      style={{ backgroundColor: "#13131a", borderBottom: "1px solid #222" }}
    >
      <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "#e63946", letterSpacing: "2px" }}>
        CINEBOOK
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm hover:text-red-500 transition-colors">Home</Link>
        <Link href="/search" className="text-sm hover:text-red-500 transition-colors">Movies</Link>
        <Link href="/my-bookings" className="text-sm hover:text-red-500 transition-colors">My Bookings</Link>
        <Link href="/login" className="text-sm px-4 py-2 rounded" style={{ backgroundColor: "#e63946" }}>Login</Link>
      </div>
    </nav>
  );
}