import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full min-h-16 h-auto md:h-16 flex justify-between items-center text-slate-400 px-4 md:px-10 backdrop-blur-md font-black bg-gray-800/20 border-b border-white/5 z-50">
      <div className="flex items-center space-x-5 sm:space-x-8 md:space-x-11 flex-1 justify-center md:ml-15">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/#work" className="hover:text-white transition-colors">
          Work
        </Link>
        <Link href="/#todo" className="hover:text-white transition-colors">
          Todo
        </Link>
        <Link href="/#contact" className="hover:text-white transition-colors">
          Contact
        </Link>
      </div>

      <div className=" flex justify-end pl-2">
        <Link
          href="/login"
          className="text-red-900 hover:text-red-500 transition-colors font-black text-xs sm:text-sm whitespace-nowrap"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
