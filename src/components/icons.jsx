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
