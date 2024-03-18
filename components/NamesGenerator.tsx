"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOpenInNew, MdRefresh } from "react-icons/md";

import { generateMetaName } from "@/lib/generator";
import { Button } from "@/components/Button";
import routes from "@/constants/routes";

const NamesGenerator = () => {
  const router = useRouter();
  const [generatedName, setGeneratedName] = useState<string | null>();

  useEffect(() => {
    setGeneratedName(generateMetaName());
  }, []);

  return (
    <>
      <div className="font-bold" suppressHydrationWarning>
        {generatedName}
      </div>

      <div className="flex gap-3 md:flex-row flex-col justify-center">
        <Button
          key={generatedName}
          icon={<MdOpenInNew />}
          variant="primary"
          className="mb-1"
          onClick={() => {
            router.push(`${routes.register.path}/${generatedName}`);
          }}
        >
          Register now
        </Button>
        <Button
          icon={<MdRefresh />}
          variant="primary"
          onClick={() => {
            setGeneratedName(generateMetaName());
          }}
        >
          Regenerate
        </Button>
      </div>
    </>
  );
};

export { NamesGenerator };
