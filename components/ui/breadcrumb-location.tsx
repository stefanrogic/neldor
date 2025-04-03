"use client";

import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbLocation() {
  const location = usePathname().split("/")[1];
  const locationFixed = location.charAt(0).toUpperCase() + String(location).slice(1);

  return <BreadcrumbPage>{locationFixed}</BreadcrumbPage>;
}
