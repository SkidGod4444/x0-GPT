import { BrandLinks } from "@/db/defaults";
import Image from "next/image";
import Link from "next/link";

export function CreditsComp() {
  return (
    <div className="relative w-full grid grid-cols-2 md:grid-cols-5 gap-5 items-center justify-items-center mx-auto max-w-full mt-5 px-60">
      <Link href={BrandLinks.upstash}>
        <Image
          src="/brands/upstash.svg"
          alt="upstash-brand"
          width={120}
          height={120}
        />
      </Link>

      <Link href={BrandLinks.supabase}>
        <Image
          src="/brands/supabase.svg"
          alt="supabase-brand"
          width={120}
          height={120}
        />
      </Link>

      <Link href={BrandLinks.nextjs}>
        <Image
          src="/brands/nextjs.svg"
          alt="nextjs-brand"
          width={120}
          height={120}
        />
      </Link>

      <Link href={BrandLinks.vercel}>
        <Image
          src="/brands/vercel.svg"
          alt="vercel-brand"
          width={120}
          height={120}
        />
      </Link>

      <Link href={BrandLinks.acternity}>
        <Image
          src="/brands/acternity.png"
          alt="acternity-brand"
          width={300}
          height={300}
        />
      </Link>
    </div>
  );
}
