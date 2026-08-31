import { FAQ_ITEMS } from "@/components/faq";
import { config } from "@/lib/config";
import { EXTERNAL_LINKS, SEARCH } from "@/lib/constants";

/**
 * Organization + WebSite + SoftwareApplication + FAQPage graph. Search engines
 * read the FAQ answers from the same array the accordion renders, so the two
 * can't drift, and the SearchAction target is built from the same query
 * parameter the hero search writes to the URL.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${config.siteUrl}/#organization`,
        name: config.siteName,
        url: config.siteUrl,
        logo: `${config.siteUrl}/opengraph-image`,
        sameAs: [
          EXTERNAL_LINKS.GITHUB,
          EXTERNAL_LINKS.TWITTER,
          EXTERNAL_LINKS.TELEGRAM,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${config.siteUrl}/#website`,
        url: config.siteUrl,
        name: config.siteName,
        description: config.siteDescription,
        inLanguage: "en-US",
        publisher: { "@id": `${config.siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${config.siteUrl}/?${SEARCH.QUERY_PARAM}={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${config.siteUrl}/#app`,
        name: "Meta Names",
        url: config.appUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        publisher: { "@id": `${config.siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${config.siteUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
