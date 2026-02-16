"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pt-12">
      <div className="container">
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 py-8 sm:flex-row sm:justify-between">
          <Link href="/" className="inline-block">
            <span className="font-serif text-lg font-bold text-primary">
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
