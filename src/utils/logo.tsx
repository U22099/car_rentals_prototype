export default function Logo() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:scale-105"
    >
      <polygon
        points="17,3 31,11 31,23 17,31 3,23 3,11"
        stroke="var(--color-logo-stroke)"
        strokeWidth="1.5"
        fill="var(--color-logo-fill)"
      />
      <path
        d="M17 8L25 24H20.5L17 16.5L13.5 24H9L17 8Z"
        fill="var(--color-text-primary)"
      />
      <circle cx="17" cy="19.5" r="1.5" fill="var(--color-logo-stroke)" />
    </svg>
  );
}