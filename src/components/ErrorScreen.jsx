import Image from "next/image";

// Soft shapes behind the illustration, two rows of four (images in public/image/404).
// The middle ones are mostly hidden by the illustration, so they are the plain lavender ones.
const shapes = [
  "rectangle-2", // pink
  "rectangle-4",
  "rectangle-8",
  "rectangle-10",
  "rectangle-5",
  "rectangle-3", // blue
  "rectangle-4",
  "rectangle-9", // blue
];

/*
  The 404 page (app/not-found.js) and the "something went wrong" page (app/error.js):
  an orange "Oops..." and a title on the left, the shapes on the right (below on phones)
  with the 404 illustration over them when `illustration` is set, and a grey wave behind it all.
  `children` are the buttons under the text.
*/
export default function ErrorScreen({ title, text, illustration = true, children }) {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* The wave across the page */}
      <Image
        src="/image/404/vector-1.png"
        alt=""
        width={2880}
        height={914}
        sizes="100vw"
        className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 select-none"
      />

      <div className="site-container relative grid items-center gap-10 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:min-h-[32rem] lg:py-20">
        <div>
          <h1 className="animate-slide-in text-3xl leading-tight font-bold motion-reduce:animate-none sm:text-4xl lg:text-5xl">
            <span className="block text-brand-orange">Oops...</span>
            {title}
          </h1>
          <p className="mt-4 animate-slide-in text-sm [animation-delay:100ms] motion-reduce:animate-none sm:text-base">
            {text}
          </p>
          <div className="mt-6 flex animate-slide-in flex-wrap gap-3 [animation-delay:200ms] motion-reduce:animate-none">
            {children}
          </div>
        </div>

        {/* pt: room for the illustration, which rises above the top row of shapes */}
        <div className="relative w-full animate-pop-in pt-[6%] [animation-delay:150ms] motion-reduce:animate-none">
          <div aria-hidden="true" className="grid grid-cols-4 gap-1">
            {shapes.map((shape, index) => (
              <Image
                key={index}
                src={`/image/404/${shape}.png`}
                alt=""
                width={300}
                height={300}
                sizes="(min-width: 768px) 14vw, 25vw"
                className="h-auto w-full"
              />
            ))}
          </div>

          {illustration && (
            <Image
              src="/image/404/error-404.png"
              alt="A puzzled woman beside a computer showing 404 Error, Page Not Found"
              width={722}
              height={714}
              preload
              sizes="(min-width: 768px) 30vw, 56vw"
              className="absolute bottom-[1%] left-1/2 h-auto w-[56%] -translate-x-1/2"
            />
          )}
        </div>
      </div>
    </section>
  );
}

// The buttons of the error pages: filled orange, and orange outline
const buttonBase =
  "inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand-orange px-4 py-2 text-sm font-semibold transition-colors";

export const errorButton = `${buttonBase} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`;

export const errorButtonOutline = `${buttonBase} text-brand-orange hover:bg-brand-orange hover:text-white`;
