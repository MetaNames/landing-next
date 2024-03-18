import { MdOpenInNew } from "react-icons/md";
import { Button } from "./Button";
import Logo from "./Logo";
import Link from "next/link";
import routes from "@/constants/routes";

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <header className="bg-primary px-4 lg:px-6 sticky top-0 w-full z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2">
        <a href="/" className="flex items-center">
          <Logo />
          <span className="text-white self-center text-xl font-medium whitespace-nowrap dark:text-white">
            Meta Names
          </span>
        </a>
        <Button
          icon={<MdOpenInNew />}
          variant="secondary"
          href={routes.app.path}
        >
          Launch App
        </Button>
      </div>
    </header>
  );
};

export { Header };
