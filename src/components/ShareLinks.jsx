"use client";

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

// Each network's "share this page" address. url is the address of the page being shared.
const networks = [
  { label: "Facebook", Icon: FacebookIcon, share: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  { label: "X", Icon: TwitterIcon, share: (url, title) => `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
  // Instagram has no "share a link" page, so this opens Instagram itself
  { label: "Instagram", Icon: InstagramIcon, share: () => "https://www.instagram.com/" },
  { label: "LinkedIn", Icon: LinkedinIcon, share: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
];

// "Share via:" row of the blog details page. Shares the page that is open in the browser.
export default function ShareLinks({ title }) {
  const open = (network) => {
    const url = encodeURIComponent(window.location.href.split("#")[0]);
    window.open(network.share(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-accent">Share via:</span>
      {networks.map((network) => (
        <button
          key={network.label}
          type="button"
          aria-label={`Share on ${network.label}`}
          onClick={() => open(network)}
          className="cursor-pointer text-ink transition-colors duration-300 hover:text-accent"
        >
          <network.Icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
