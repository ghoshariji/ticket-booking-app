import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.yellow.500),black)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-yellow-600/10 ring-1 ring-yellow-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Image
            className="mx-auto h-12"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMAX_logo.svg/512px-IMAX_logo.svg.png"
            alt="Movie Booking Logo"
            width={200}
            height={50}
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
              <p>
                “Booking tickets for my favorite movies has never been easier.
                The experience is seamless, and the customer service is
                outstanding. Can't wait to book my next show!”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <Image
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1603415526960-f46e3ac2e834?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
                width={40}
                height={40}
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-white">John Doe</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-white"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-400">Movie Enthusiast</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
