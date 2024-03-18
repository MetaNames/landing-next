import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

import { Button } from "@/components/Button";
import { NamesGenerator } from "@/components/NamesGenerator";
import { RecentDomains } from "@/components/RecentDomains";
import { RecordClasses } from "@/components/RecordClasses";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";

export default function Home() {
  const Subtitle = ({ title }: { title: string }) => (
    <h2 className="text-5xl font-medium">{title}</h2>
  )
  return (
    <main className="min-h-screen">
      <Section variant="primary" className="min-h-[450px] space-y-8">
        <h1 className="text-7xl font-medium py-8">META NAMES</h1>
        <span className="text-xs">
          Powered by{" "}
          <Link
            className="font-semibold"
            href="https://partisiablockchain.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Partisia Blockchain
          </Link>
        </span>

        <h6 className="text-xl font-medium py-8 leading-loose">
          Save your <RecordClasses /> on your favourite web3 name
        </h6>
      </Section>

      <Section variant={"secondary"}>
        <Stats />
        <Subtitle title="The only name you need" />
        <p>
          Register your domain and subdomains effortlessly with{" "}
          <b>Meta Names</b>, the cutting-edge web3 domain name system for
          <Link
            href="https://partisiablockchain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium px-2"
          >
            Partisia Blockchain.
          </Link>
        </p>
        <p>
          Create your unique Meta Names profile using your personal domain,
          allowing you to store and manage a wide array of information all in
          one place.
        </p>
        <p>
          With Meta Names, you can effortlessly organize your wallet addresses,
          social media handles (including Discord and Twitter), website links,
          and much more under your unique domain.
        </p>
      </Section>

      <Section variant="primary" contentClassName="px-0 md:px-0 max-w-full">
        <Subtitle title="Recently registered domains" />
        <p>Check out the freshest domains just claimed on Meta Names!</p>
        <p>
          Did you just register a domain? Brag your new Meta Name in our{" "}
          <Link
            href="https://t.me/mpc_metanames"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium px-2"
          >
            community channel
          </Link>
        </p>
        <RecentDomains />
      </Section>

      <Section variant={"secondary"}>
        <Subtitle title="Generate your Meta Name" />
        <p>
          {"Running low on ideas? No worries, we've got your back!"}
          <br />
          {"How about snagging the following domain?"}
        </p>

        <NamesGenerator />
      </Section>

      <Section variant="primary">
        <Subtitle title="Integrate with Meta Names SDK" />
        <p>
          Discover the ease of web3 domain management with <b>Meta Names SDK</b>{" "}
          for Partisia Blockchain.
          <br />
          Our platform offers simple domain and subdomain registration,
          versatile information embedding, and a developer-friendly toolkit.
          <br />
          <Link
            href="https://t.me/mpc_metanames"
            target="_blank"
            rel="noopener noreferrrer"
            className="underline font-medium px-2"
          >
            Join our supportive community
          </Link>
          , access detailed documentation, and transform your applications with
          the power of Meta Names.
          <br />
          Your journey into the future of web3 starts here.
        </p>
        <Button
          icon={<MdOpenInNew />}
          variant="secondary"
          href={"https://docs.metanames.app"}
        >
          Learn More
        </Button>
      </Section>
    </main>
  );
}
