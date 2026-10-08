import Image from "next/image";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 44 }: LogoProps) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-[#1a7bd4]/70 transition-transform duration-300 group-hover:scale-[1.03]"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpeg"
        alt="DOUBLE I.TANZE LTD. logo"
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}