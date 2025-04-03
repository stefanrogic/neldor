import { files } from "@/data/data";
import { FaFileAlt } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
      {files.map((f, i) => (
        <Link key={i} href={"/editor/" + f.slug} className="flex flex-col gap-y-2">
          <div className="flex justify-center items-center aspect-square bg-gray-200">
            <FaFileAlt size={75} color="gray" />
          </div>
          <span className="text-sm">{f.name}</span>
        </Link>
      ))}
      <Link href="/editor/new" className="flex flex-col justify-center items-center aspect-square border border-gray-200 hover:bg-gray-200">
        <IoAddCircleOutline size={50} color="gray" />
      </Link>
    </div>
  );
}
