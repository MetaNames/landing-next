import Link from "next/link";
import Logo from "./Logo";
import routes from "@/constants/routes";

export interface FooterProps {}

const links = [
  {
    title: "App",
    url: routes.app.path,
  },
  {
    title: "Docs",
    url: "https://docs.metanames.app",
  },
  {
    title: "Telegram",
    url: "https://t.me/mpc_metanames",
  },
  {
    title: "Twitter",
    url: "https://x.com/metanames_",
  },
  {
    title: "GitHub",
    url: "https://github.com/metanames",
  },
];

const Footer = (props: FooterProps) => {
  return (
    <footer className="bg-secondary flex justify-between py-6 px-4 flex-col md:flex-row sm:items-left items-center gap-5">
      <a href="/" className="flex items-center">
        <Logo />
        <span className="text-white self-center text-xs font-medium whitespace-nowrap dark:text-white">
          Meta Names
        </span>
      </a>
      <div className="flex flex-row items-center justify-evenly gap-5">
        {links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            href={link.url}
            className="text-xs text-white"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export { Footer };
