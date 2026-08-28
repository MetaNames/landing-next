import { FAQ_ITEMS } from "@/components/faq";
import { config } from "@/lib/config";
import { EXTERNAL_LINKS } from "@/lib/constants";

/**
 * Organization + WebSite + FAQPage graph. Search engines read the FAQ answers
 * from the same array the accordion renders, so the two can't drift.
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
