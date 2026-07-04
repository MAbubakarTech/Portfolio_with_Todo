import Contact from "./Contact/page";
import Work from "./Work/page";
import Todo from "./Todo/page";
export default function LandingPage() {
  return (
    <main>
      <div className="relative min-h-full flex py-20 justify-center bg-slate-950">
        <div className=" fixed top-1/4 left-1/4 w-72 h-72 bg-green-600 rounded-9xl filter blur-[120px] opacity-30"></div>
        <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-red-600 rounded-r-9xl filter blur-[120px] opacity-30"></div>

        <div className="relative z-10 bg-white/5 border border-white/30 p-12 rounded-2xl shadow-4xl max-w-md text-center transition-all duration-350 hover:scale-105">
          <h1 className="text-5xl font-black bg-linear-to-r from-white via-slate-500 to-red-300 bg-clip-text text-transparent mb-5">
            Welcome
          </h1>
          <p className="text-slate-400 font-black">To my Portfolio.</p>
        </div>
      </div>

      <section className="min-h-screen flex justify-center bg-slate-950">
        <div className="flex flex-col items-start px-20 w-full">
          <h1 className="text-5xl py-10 font-black bg-linear-to-r from-white via-slate-500 to-red-300 bg-clip-text text-transparent text-center w-full ">
            Hello, My name is Abubakar
          </h1>
          <p className="relative mt-20 z-10 bg-white/5 border border-white/30 p-7 rounded-2xl shadow-3xl max-w-md text-center text-slate-400 transition-all duration-350 hover:scale-105">
            I am a recent Computer Science graduate and Full-Stack Developer
            with proven industry experience delivering production-ready
            applications. Specializing in the MERN stack (React, Next.js,
            Node.js, and MongoDB), I build with a security-first mindset,
            focusing heavily on JWT authentication, strict Role-Based Access
            Control (RBAC), and fixing production vulnerabilities. I thrive on
            writing clean, optimized code that speeds up database performance,
            safeguards user data, and scales seamlessly to support business
            growth.
          </p>
        </div>
      </section>
      <Work />
      <Todo />
      <Contact />
    </main>
  );
}
