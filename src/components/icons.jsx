// Small inline SVG icons. Size and colour come from className (e.g. "size-5 text-brand-orange").

function Icon({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <Icon {...props}>
      <path d="m5 9 7 7 7-7" />
    </Icon>
  );
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function SearchIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </Icon>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </Icon>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Icon>
  );
}

// The "back" arrow on the Back to Homepage buttons
export function ReturnIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function CalendarIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M3 10h18" />
    </Icon>
  );
}

export function CalendarHeartIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M3 10h18" />
      <path d="m12 18.5-2.4-2.3a1.6 1.6 0 0 1 2.3-2.3l.1.1.1-.1a1.6 1.6 0 0 1 2.3 2.3Z" />
    </Icon>
  );
}

export function MapPinIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  );
}

export function MonitorIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8m-4-4v4" />
    </Icon>
  );
}

export function GiftIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5h4Zm0 0s1.5-5 4-5a2.5 2.5 0 0 1 0 5h-4Z" />
    </Icon>
  );
}

export function BulbIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </Icon>
  );
}

export function PresentationIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 4h18M5 4v10h14V4m-7 10v3m0 0-3 3m3-3 3 3" />
    </Icon>
  );
}

export function SoundIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 10v4m4-8v12m4-9v6m4-11v16m4-10v4" />
    </Icon>
  );
}

export function ChatIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 4h11v8H8l-4 3V4Z" />
      <path d="M18 9h2v10l-3-2.5h-6V15" />
    </Icon>
  );
}

export function LetterIcon(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="m9 14 3-7 3 7m-5-2h4M9 17.5h6" />
    </Icon>
  );
}

export function SpeakerIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 9v6h3l5 4V5L7 9H4Z" />
      <path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a8 8 0 0 1 0 11" />
    </Icon>
  );
}

export function CertificateIcon(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M10.5 12 10 16l2-1 2 1-.5-4" />
    </Icon>
  );
}

export function ScrollIcon(props) {
  return (
    <Icon {...props}>
      <path d="M8 4h10a2 2 0 0 1 2 2v2h-4M8 4a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2M10 9h3m-3 4h3" />
    </Icon>
  );
}

export function BookOpenIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 6c-2-1.3-5-1.5-8-1v13c3-.5 6-.3 8 1 2-1.3 5-1.5 8-1V5c-3-.5-6-.3-8 1Zm0 0v13" />
    </Icon>
  );
}

export function GraduationCapIcon(props) {
  return (
    <Icon {...props}>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c2 2 10 2 12 0v-5m4-2v6" />
    </Icon>
  );
}

export function MessageCircleIcon(props) {
  return (
    <Icon {...props}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
      <path d="M12 9v3m0 3v.01" />
    </Icon>
  );
}

export function ChevronUpIcon(props) {
  return (
    <Icon {...props}>
      <path d="m5 15 7-7 7 7" />
    </Icon>
  );
}

export function PhoneIcon(props) {
  return (
    <Icon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </Icon>
  );
}

export function MailIcon(props) {
  return (
    <Icon {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </Icon>
  );
}

// Social media logos, used in white on a coloured square (components/Footer.jsx).

export function LinkedinIcon(props) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

// The play triangle is cut out, so the square's colour shows through it.
export function YoutubeIcon(props) {
  return (
    <Icon fill="currentColor" stroke="none" fillRule="evenodd" {...props}>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17Zm7.5-2 5-3-5-3v6Z" />
    </Icon>
  );
}

export function FacebookIcon(props) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z" />
    </Icon>
  );
}

export function InstagramIcon(props) {
  return (
    <Icon {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Icon>
  );
}

export function XIcon(props) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.3l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
    </Icon>
  );
}

export function TwitterIcon(props) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2Z" />
    </Icon>
  );
}

export function CartIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="20" r="1.25" />
      <circle cx="18" cy="20" r="1.25" />
      <path d="M2 3h2.5l2.7 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.6L21.5 8H13" />
      <path d="M9 5v6M6 8h6" />
    </Icon>
  );
}

export function HourglassIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 22h14M5 2h14" />
      <path d="M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22" />
      <path d="M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2" />
    </Icon>
  );
}

export function ListCheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 6h13M3 12h13M3 18h8m4-1 2 2 4-4" />
    </Icon>
  );
}

export function TicketIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
      <path d="M13 5v2m0 4v2m0 4v2" />
    </Icon>
  );
}

export function InfoIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-8v.01" />
    </Icon>
  );
}

export function SproutIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" />
    </Icon>
  );
}

export function TelescopeIcon(props) {
  return (
    <Icon {...props}>
      <path d="m10.1 12.5-6.2 1.3a.9.9 0 0 1-1.1-.7l-.5-2.1a1.1 1.1 0 0 1 .7-1.3l13.5-4.4M13.6 11.7l4.3-.9M16 21l-3.1-6.2M8 21l3.1-6.2M6.2 8.6l1.1 4.5" />
      <path d="M16.5 5.9A2 2 0 0 1 17.9 3.5l1.1-.3a1 1 0 0 1 1.2.7l1.5 6.1a1 1 0 0 1-.7 1.2l-1.1.3a2 2 0 0 1-2.4-1.5Z" />
      <circle cx="12" cy="13" r="2" />
    </Icon>
  );
}

export function HeartHandshakeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M19.4 13.5 12 21l-7.4-7.5A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 7.4 6.9Z" />
      <path d="m12 6.6-3 3a1.5 1.5 0 0 0 2.1 2.1L13 10l3.5 3.5M14.5 15.5l-1.5-1.5" />
    </Icon>
  );
}
