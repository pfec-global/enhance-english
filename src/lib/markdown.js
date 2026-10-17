// Helpers for the blog details page: they turn the h2 headings of a markdown text into the table of contents.

// "Why Study in Canada?" -> "why-study-in-canada"
export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // drop punctuation, keep letters and numbers of any language
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");

// Remove the markdown symbols from a heading, so "**Fees** in [Canada](/x)" becomes "Fees in Canada"
const plainText = (text) =>
  text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images -> their text
    .replace(/[*_~`]/g, "")
    .trim();

// List every h2 ("## Title") of the markdown as { id, text }, in order.
// Lines inside a code block are skipped. If two headings have the same text the second id ends in -2, and so on.
export function getHeadings(markdown) {
  const headings = [];
  const used = {};
  let inCode = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inCode = !inCode;
    if (inCode) continue;

    const match = line.match(/^ {0,3}##\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const text = plainText(match[1]);
    const base = slugify(text) || "section";
    used[base] = (used[base] ?? 0) + 1;
    headings.push({ id: used[base] > 1 ? `${base}-${used[base]}` : base, text });
  }

  return headings;
}

const textOf = (node) => (node.type === "text" ? node.value : (node.children ?? []).map(textOf).join(""));

// Plugin for react-markdown: gives every rendered <h2> the id of its entry in headings (from getHeadings),
// so the links of the table of contents have something to jump to.
export const rehypeHeadingIds = (headings) => (tree) => {
  let index = 0;
  const visit = (node) => {
    if (node.tagName === "h2") {
      node.properties.id = headings[index]?.id ?? slugify(textOf(node));
      index++;
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};

const isQuestion = (node) => ["h3", "h4", "h5", "h6"].includes(node.tagName);

// Plugin for react-markdown: turns the FAQ section of a post into an accordion.
// The FAQ section is the h2 whose text contains "FAQ" or "Frequently Asked" - it ends at the next h2.
// Inside it, every smaller heading (h3 - h6) is a question and everything up to the next question is its answer:
//
//   ## Frequently Asked Questions
//   #### How long is a PTE score valid?      -> the row you click
//   A PTE Academic score is valid for...     -> opens under it
//
// The result is <faq-list> with one <faq-item> per question, each holding a <faq-question> and a <faq-answer>.
// These are not real HTML tags: BlogContent.js draws them with the FaqAccordion components.
export const rehypeFaqAccordion = () => (tree) => {
  const element = (tagName, children) => ({ type: "element", tagName, properties: {}, children });
  const result = [];
  let inFaq = false;
  let list = null; // the <faq-list> of the current FAQ section
  let answer = null; // the <faq-answer> being filled

  for (const node of tree.children) {
    if (node.tagName === "h2") {
      inFaq = /\bfaqs?\b|frequently asked/i.test(textOf(node));
      list = null;
      answer = null;
      result.push(node);
    } else if (inFaq && isQuestion(node)) {
      if (!list) {
        list = element("faq-list", []);
        result.push(list);
      }
      answer = element("faq-answer", []);
      list.children.push(element("faq-item", [element("faq-question", node.children), answer]));
    } else if (answer) {
      answer.children.push(node);
    } else {
      result.push(node);
    }
  }

  tree.children = result;
};
