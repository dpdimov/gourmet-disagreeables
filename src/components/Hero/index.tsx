import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Gourmet Disagreeables
              </h1>
              <p className="mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                Our shared recipe collection &mdash; tried, tested, and
                disagreed upon. Upload your favourites, browse the archive, and
                find your next dinner.
              </p>
              <div className="mx-auto grid max-w-[640px] gap-5 sm:grid-cols-2">
                <Link
                  href="/submit"
                  className="group rounded-card border border-gray-200 bg-white p-6 text-left shadow-card transition hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <h3 className="mb-1 font-serif text-lg font-bold text-black">
                    Submit a Recipe
                  </h3>
                  <p className="text-sm leading-relaxed text-body-color">
                    Share a recipe with the group. Add ingredients, method, and
                    a photo &mdash; or import from a URL.
                  </p>
                </Link>
                <Link
                  href="/recipes"
                  className="group rounded-card border border-gray-200 bg-white p-6 text-left shadow-card transition hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h3 className="mb-1 font-serif text-lg font-bold text-black">
                    Browse Recipes
                  </h3>
                  <p className="text-sm leading-relaxed text-body-color">
                    Search by ingredient, filter by course, and find your next
                    dinner inspiration.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="277"
            cy="63"
            r="225"
            fill="url(#paint0_linear_hero)"
          />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            fill="url(#paint1_radial_hero)"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            fill="url(#paint2_radial_hero)"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_hero)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_hero"
              x1="-54.5003"
              y1="-178"
              x2="222"
              y2="288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c0532d" />
              <stop offset="1" stopColor="#c0532d" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_hero"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
            >
              <stop offset="0.145833" stopColor="#c0532d" stopOpacity="0" />
              <stop offset="1" stopColor="#c0532d" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_hero"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
            >
              <stop offset="0.145833" stopColor="#c0532d" stopOpacity="0" />
              <stop offset="1" stopColor="#c0532d" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient
              id="paint3_linear_hero"
              x1="226.775"
              y1="-66.1548"
              x2="292.157"
              y2="351.421"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c0532d" />
              <stop offset="1" stopColor="#c0532d" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_hero_b)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_hero_b)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_hero_b"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c0532d" stopOpacity="0" />
              <stop offset="1" stopColor="#c0532d" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_hero_b"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c0532d" stopOpacity="0" />
              <stop offset="1" stopColor="#c0532d" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
