import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, className = "h-11 w-auto" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Circular Resourcing home" className="shrink-0">
      <Image
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="Circular Resourcing"
        width={563}
        height={250}
        priority
        className={className}
      />
    </Link>
  );
}
