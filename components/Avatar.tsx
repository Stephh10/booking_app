// components/Avatar.tsx
import Image from "next/image";

export default function Avatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt || "User Avatar"}
      width={40}
      height={40}
      className="rounded-full border border-gray-200 object-cover"
    />
  );
}
