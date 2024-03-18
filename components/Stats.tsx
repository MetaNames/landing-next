"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";

import partisiaImage from "@/public/assets/images/partisia-logo.png";
import { useStats } from "@/hooks/useStats";

const partisiaBlock = {
  name: "partisia",
  children: (
    <div className="flex gap-6 justify-around items-center">
      <span className="text-xs">Supported by</span>
      <Link
        href="https://partisiablockchain.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={partisiaImage}
          alt="Partisia Blockchain"
          className="w-full h-full max-w-[200px]"
        />
      </Link>
    </div>
  ),
};

const Stats = () => {
  const { stats } = useStats();
  const infos = [
    partisiaBlock,
    {
      name: "domainCount",
      children: (
        <div className="flex gap-6 justify-around items-center">
          <span className="text-sm font-bold">
            {stats?.domainCount && (
              <CountUp end={stats?.domainCount} duration={5} />
            )}
          </span>
          <div className="text-xs">Meta Names Registered</div>
        </div>
      ),
    },
    {
      name: "ownerCount",
      children: (
        <div className="flex gap-6 justify-around items-center">
          <span className="text-sm font-bold">
            {stats?.ownerCount && (
              <CountUp end={stats?.ownerCount} duration={5} />
            )}
          </span>
          <div className="text-xs">Unique Wallets</div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-between gap-4 md:flex-row flex-col mx-auto">
      {infos.map(({ name, children }) => (
        <div
          key={name}
          className="flex bg-primary p-4 rounded-lg justify-center min-w-full md:min-w-[30%]"
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export { Stats };
