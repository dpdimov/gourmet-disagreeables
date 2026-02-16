import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="mx-auto max-w-[530px] text-center">
          <div className="mx-auto mb-8 text-[80px] font-bold leading-none text-primary sm:text-[100px]">
            404
          </div>
          <h2 className="mb-4 font-serif text-2xl font-bold text-black sm:text-3xl">
            Recipe Not Found
          </h2>
          <p className="mb-8 text-base text-body-color">
            Looks like this dish has gone off the menu. The page you&apos;re
            looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-btn transition hover:bg-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
