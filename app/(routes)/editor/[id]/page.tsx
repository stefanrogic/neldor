"use client";

import { usePathname } from "next/navigation";
import { files } from "@/data/data";

export default function Editor() {
  const id = usePathname().split("/")[2];
  const file = files.find((f) => f.slug === id);

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-5xl font-bold">{file?.name}</h1>
      <h1 className="text-2xl">{file?.content}</h1>
    </div>
  );
}
