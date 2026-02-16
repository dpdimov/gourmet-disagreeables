"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pt-12">
      <div className="container">
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 py-8 sm:flex-row sm:justify-between">
          <Link href="/" className="inline-block">
            <span className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
              <svg
                className="h-6 w-6"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4c0 0 .5 1.5.5 4.5S8 14 8 14l6 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="7.5" y1="14" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M23 4v6c0 2-1 3.5-2.5 4l2.5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="21" y1="4" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="25" y1="4" x2="25" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="26" x2="26" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
              </svg>
              Gourmet Disagreeables
            </span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-body-color">
            <Link href="/recipes" className="transition hover:text-primary">
              Recipes
            </Link>
            <Link href="/submit" className="transition hover:text-primary">
              Submit
            </Link>
            <Link href="/admin" className="transition hover:text-primary">
              Admin
            </Link>
          </div>
        </div>
        <div className="pb-6">
          <p className="text-center text-sm text-body-color">
            &copy; {new Date().getFullYear()} The Disagreeables. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
