// Cleans up the body of a blog post from the blog CMS before it is drawn by BlogContent.
// (Copied from the PFEC India site, without its rewrite of old pfecglobal.in post links.)
// The editors write markdown, but paste ready-made HTML (tables, "Also Read" boxes) inside ``` fences,
// which markdown would show as a block of code. These helpers turn all of that into normal content.

// <div class="blog-also-read-box"> ... <a href="url">text</a> </div>  ->  > **Also Read:** [text](url)
// (a markdown quote, which BlogContent already draws as a highlighted box)
const ALSO_READ_BOX =
  /<div[^>]*class="[^"]*blog-also-read-box[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/div>/gi;

export function prepareBlogMarkdown(content) {
  if (typeof content !== "string" || !content.trim()) return "";

  return (
    content
      .replace(/\r\n?/g, "\n")
      // Unwrap ``` fences that hold HTML, so the HTML is drawn instead of being shown as code.
      // Blank lines inside are removed: a blank line would end the HTML block and break the table.
      .replace(/```(?:html|markdown)?[ \t]*\n([\s\S]*?)```/gi, (fence, inner) =>
        inner.trim().startsWith("<") ? `\n\n${inner.trim().replace(/\n\s*\n/g, "\n")}\n\n` : fence,
      )
      .replace(ALSO_READ_BOX, (box, href, label) => `\n\n> **Also Read:** [${label.replace(/\s+/g, " ").trim()}](${href})\n\n`)
      // Some tables arrive with the body opened or closed twice
      .replace(/<tbody>\s*<tbody>/gi, "<tbody>")
      .replace(/<\/tbody>\s*<\/tbody>/gi, "</tbody>")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

// The FAQ block of a post ([{ question, answer }]) as markdown.
// BlogContent turns a "Frequently Asked Questions" section into an accordion, so the FAQ needs no component of its own.
export function faqToMarkdown(items) {
  const questions = (Array.isArray(items) ? items : []).filter((item) => item?.question?.trim() && item?.answer?.trim());
  if (questions.length === 0) return "";
  return [
    "## Frequently Asked Questions",
    ...questions.map((item) => `#### ${item.question.trim()}\n\n${prepareBlogMarkdown(item.answer)}`),
  ].join("\n\n");
}

// Markdown -> plain text, for the short summary in the hero and the SEO description
export const stripMarkdown = (text) =>
  typeof text === "string"
    ? text
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
        .replace(/[*_~`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";
