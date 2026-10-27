import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbTrail, type BreadcrumbPageKey } from "@/lib/seo";

/** Visible "Inicio > page" trail, built from the same data as the JSON-LD. */
export default function LegalBreadcrumb({ page }: { page: BreadcrumbPageKey }) {
  const [home, current] = breadcrumbTrail(page);

  return (
    <Breadcrumb aria-label="Migas de pan" className="mb-6">
      <BreadcrumbList className="text-zinc-300 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-white">
            <Link to={home.path}>{home.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">{current.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
