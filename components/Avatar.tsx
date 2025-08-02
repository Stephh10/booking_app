// components/Avatar.tsx
import Image from "next/image";

export default function Avatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="w-[40px] h-[40px] relative">
      <Image
        src={src}
        alt={alt || "User Avatar"}
        fill
        className="rounded-full border border-gray-200 object-cover"
      />
    </div>
  );
}
