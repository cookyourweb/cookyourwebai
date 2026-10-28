import { Head } from "vite-react-ssg";

import { OG_IMAGE, PAGES, SITE, canonical, jsonLdFor, type PageKey, type PageMeta } from "@/lib/seo";

interface SeoProps {
  page: PageKey;
}

/**
 * Renders the head of a route from the meta table in lib/seo.ts.
 * Indexable pages get a self-referencing canonical and og:url; pages with a
 * robots directive get that directive and neither, since a canonical on a
 * noindex page sends Google contradictory signals.
 */
export default function Seo({ page }: SeoProps) {
  const { path, title, description, robots } = PAGES[page] as PageMeta;
  const url = robots ? undefined : canonical(path);
  const jsonLd = robots ? undefined : jsonLdFor(page);

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:image" content={OG_IMAGE.url} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={OG_IMAGE.url} />
      <meta name="twitter:image:alt" content={OG_IMAGE.alt} />
      {jsonLd && (
        // "<" is escaped so no string in the data can close the script tag.
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
      )}
    </Head>
  );
}
