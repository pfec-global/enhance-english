import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { rehypeFaqAccordion, rehypeHeadingIds } from "@/lib/markdown";
import { FaqItem, FaqList } from "@/components/FaqAccordion";

// How each markdown element is drawn. react-markdown also passes a "node" prop, which must not reach the HTML tag.
const components = {
  // scroll-mt leaves room for the sticky navbar and the floating "Jump to Topic" box when jumping to a heading.
  // Sizes: h2 18px, h3 17px, h4 16px, the text 16px (at least; the site's sizes shrink on laptops, see globals.css)
  h2: ({ node, ...props }) => (
    <h2 className="mt-10 scroll-mt-40 text-[max(18px,1.125rem)] font-bold text-indigo first:mt-0" {...props} />
  ),
  h3: ({ node, ...props }) => <h3 className="mt-8 text-[max(17px,1.0625rem)] font-bold text-ink" {...props} />,
  h4: ({ node, ...props }) => <h4 className="mt-6 text-[max(16px,1rem)] font-bold text-ink" {...props} />,
  h5: ({ node, ...props }) => <h5 className="mt-6 font-bold text-ink" {...props} />,
  h6: ({ node, ...props }) => <h6 className="mt-6 font-semibold text-ink" {...props} />,
  p: ({ node, ...props }) => <p className="mt-4" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-ink" {...props} />,
  // Links to other websites open in a new tab; links inside the site use the Next.js router.
  // Red, without an underline; it only shows on hover.
  a: ({ node, href = "", children, ...props }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="break-words text-accent hover:underline" {...props}>
        {children}
      </a>
    ) : (
      <Link href={href} className="break-words text-accent hover:underline" {...props}>
        {children}
      </Link>
    ),
  // The second set of classes is for task lists ("- [x] done"): no bullets, the checkbox takes their place
  ul: ({ node, ...props }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 [&.contains-task-list]:list-none [&.contains-task-list]:pl-1 [&_ol]:mt-2 [&_ul]:mt-2" {...props} />
  ),
  ol: ({ node, ...props }) => <ol className="mt-4 list-decimal space-y-2 pl-6 [&_ol]:mt-2 [&_ul]:mt-2" {...props} />,
  li: ({ node, ...props }) => <li className="[&>input]:mr-2 [&>input]:accent-accent [&>p]:mt-0" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="mt-6 rounded-r-lg border-l-4 border-accent bg-accent/5 px-4 py-3 italic text-ink [&>p:first-child]:mt-0"
      {...props}
    />
  ),
  // Markdown images come from the CMS with an unknown size and domain, so a plain <img> is used instead of next/image
  img: ({ node, alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" className="mt-6 h-auto max-w-full rounded-xl" {...props} />
  ),
  // Inline `code`. Inside a code block the <pre> below removes this pill styling again.
  code: ({ node, ...props }) => (
    <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[0.9em] text-ink" {...props} />
  ),
  // Code block: scrolls sideways instead of breaking the page width
  pre: ({ node, ...props }) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl bg-navy p-4 text-xs leading-relaxed text-white sm:text-sm [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
  // Tables scroll sideways on small screens instead of squeezing their columns
  table: ({ node, ...props }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-indigo/15 bg-white">
      <table className="w-full min-w-[480px] text-left text-[max(16px,1rem)] [&_p]:mt-0" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-[#f1f1f4] text-xs font-semibold text-ink" {...props} />,
  tr: ({ node, ...props }) => <tr className="border-t border-indigo/15 first:border-t-0" {...props} />,
  th: ({ node, ...props }) => <th className="px-4 py-3" {...props} />,
  td: ({ node, ...props }) => <td className="px-4 py-3 align-top" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-8 border-ink/15" {...props} />,
  // FAQ accordion: these four tags are created by rehypeFaqAccordion, they are not real HTML
  "faq-list": ({ node, ...props }) => <FaqList {...props} />,
  "faq-item": ({ node, ...props }) => <FaqItem {...props} />,
  "faq-question": ({ children }) => children,
  "faq-answer": ({ children }) => <div className="px-4 pb-4 [&>*:first-child]:mt-0">{children}</div>,
};

// The body of a blog post. markdown is the text as it comes from the API;
// headings is the list from getHeadings(markdown), used to give each h2 its id.
// remark-gfm adds tables, strikethrough, task lists and automatic links to standard markdown.
// HTML written inside the markdown (a <table>, <br>, <img>...) is rendered too, and gets the same styles as markdown:
// rehype-raw turns the HTML into real elements, then rehype-sanitize removes anything unsafe
// (<script>, <iframe>, <style>, onclick="..." and style="..." attributes), so the content cannot inject code.
// The FAQ section of the post becomes an accordion (see rehypeFaqAccordion).
// The order of the plugins matters: raw -> sanitize -> heading ids and FAQ.
export default function BlogContent({ markdown, headings }) {
  return (
    // At least 16px: on laptops the site's sizes shrink with the screen (globals.css),
    // which made text-sm about 11px there, too small to read comfortably.
    <article className="min-w-0 text-[max(16px,1rem)] leading-relaxed text-ink/80">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, [rehypeHeadingIds, headings], rehypeFaqAccordion]}
        components={components}
      >
        {markdown}
      </Markdown>
    </article>
  );
}
