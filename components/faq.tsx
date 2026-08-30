import { ChevronDown } from "lucide-react";

import { EXTERNAL_LINKS } from "@/lib/constants";

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Plain text answers, because the same list feeds both the rendered accordion
 * and the FAQPage structured data below it.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a Meta Name?",
    answer:
      "A Meta Name is a .mpc domain on the Partisia Blockchain. It replaces long wallet addresses with one readable name, and it can carry your wallets, socials, website, avatar and bio.",
  },
  {
    question: "How do I register a name?",
    answer:
      "Search for the name you want, connect a Partisia wallet in the app, and confirm the registration transaction. The name is minted to your address and you control it from that moment on.",
  },
  {
    question: "What does a name cost?",
    answer:
      "Registration is paid in MPC and priced by name length — shorter names cost more. The exact fee is shown in the app before you confirm, so nothing is charged until you approve the transaction.",
  },
  {
    question: "Can I create subdomains?",
    answer:
      "Yes. Any name you own can issue subdomains such as pay.yourname.mpc, each with its own records, and you can hand them to other addresses.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Records live on the Partisia Blockchain, so they are verifiable on-chain and readable by any app that speaks the Meta Names SDK. Nothing depends on our servers staying up.",
  },
  {
    question: "Can I build on top of it?",
    answer:
      "Yes. The Meta Names SDK is open source and covers lookups, registration, records and subdomains, so you can resolve or mint names from your own product.",
  },
];

export function Faq() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-3 text-left">
      {FAQ_ITEMS.map(({ question, answer }) => (
        <details
          key={question}
          name="faq"
          className="glass-panel group rounded-2xl px-5 py-4 transition-colors hover:border-primary/40"
        >
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none">
            {question}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm text-muted-foreground text-balance">
            {answer}
          </p>
        </details>
      ))}
      <p className="text-sm text-muted-foreground">
        Still stuck?{" "}
        <a
          href={EXTERNAL_LINKS.TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring underline underline-offset-4"
        >
          Ask on Telegram
        </a>
        .
      </p>
    </div>
  );
}
