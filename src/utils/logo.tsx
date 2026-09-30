import Image from "next/image";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 44 }: LogoProps) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-[#d7b75d]/70 transition-transform duration-300 group-hover:scale-[1.03]"
      style={{ width: size, height: size }}
    >
      <Image
        src="/IMG-20260929-WA0023.jpg"
        alt="Landpeace Logistics logo"
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}