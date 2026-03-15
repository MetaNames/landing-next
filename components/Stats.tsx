"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

import partisiaImage from "@/public/assets/images/partisia-logo.png";
import { useStats } from "@/hooks/useStats";

const partisiaBlock = {
  name: "partisia",
  children: (
    <div className="flex gap-4 justify-center items-center">
      <span className="text-sm text-white/70">Powered by</span>
      <Link
        href="https://partisiablockchain.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src={partisiaImage}
          alt="Partisia Blockchain"
          className="w-full h-full max-w-32 opacity-90 hover:opacity-100 transition-opacity"
        />
      </Link>
    </div>
  ),
};

const Stats = () => {
  const { stats } = useStats();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const infos = [
    partisiaBlock,
    {
      name: "domainCount",
      children: (
        <div className="flex flex-col gap-1 justify-center items-center text-center">
          <span className="text-3xl font-bold text-white">
            {isInView && stats?.domainCount && (
              <CountUp end={stats.domainCount} duration={2.5} separator="," />
            )}
            {!isInView && "—"}
          </span>
          <span className="text-xs text-white/60 uppercase tracking-wider">Names Registered</span>
        </div>
      ),
    },
    {
      name: "ownerCount",
      children: (
        <div className="flex flex-col gap-1 justify-center items-center text-center">
          <span className="text-3xl font-bold text-white">
            {isInView && stats?.ownerCount && (
              <CountUp end={stats.ownerCount} duration={2.5} separator="," />
            )}
            {!isInView && "—"}
          </span>
          <span className="text-xs text-white/60 uppercase tracking-wider">Unique Wallets</span>
        </div>
      ),
    },
  ];

  return (
    <motion.div 
      ref={ref}
      className="flex justify-between gap-4 md:flex-row flex-col mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {infos.map(({ name, children }, index) => (
        <motion.div
          key={name}
          className="flex bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl justify-center min-w-full md:min-w-[30%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  );
};

export { Stats };
