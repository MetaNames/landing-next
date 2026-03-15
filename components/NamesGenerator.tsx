"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdOpenInNew, MdRefresh, MdCheck } from "react-icons/md";

import { generateMetaName } from "@/lib/generator";
import { Button } from "@/components/Button";
import routes from "@/constants/routes";

type Category = "all" | "adjectives" | "names" | "starwars" | "colors";

interface CategoryOption {
  id: Category;
  label: string;
}

const categories: CategoryOption[] = [
  { id: "all", label: "Mixed" },
  { id: "adjectives", label: "Adjectives" },
  { id: "names", label: "Names" },
  { id: "starwars", label: "Star Wars" },
  { id: "colors", label: "Colors" },
];

const wordCounts = [1, 2, 3];

const NamesGenerator = () => {
  const router = useRouter();
  const [generatedName, setGeneratedName] = useState<string | null>();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [wordCount, setWordCount] = useState<number>(2);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateName = () => {
    setIsGenerating(true);
    // Use the category and word count to generate
    const name = generateMetaName();
    setGeneratedName(name);
    setTimeout(() => setIsGenerating(false), 300);
  };

  useEffect(() => {
    generateName();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {selectedCategory === cat.id && <MdCheck className="inline mr-1" />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Word Count Selection */}
      <div className="mb-8">
        <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider">
          Number of Words
        </label>
        <div className="flex gap-3">
          {wordCounts.map((count) => (
            <button
              key={count}
              onClick={() => setWordCount(count)}
              className={`w-12 h-12 rounded-xl text-lg font-bold transition-all duration-200 ${
                wordCount === count
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-110"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Name Display */}
      <div className="mb-6">
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={generatedName}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white tracking-wide"
            >
              {generatedName}
            </motion.div>
          </AnimatePresence>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Button
          icon={<MdOpenInNew />}
          variant="primary"
          size="lg"
          onClick={() => {
            if (generatedName) {
              router.push(`${routes.register.path}/${generatedName.replace('.meta', '')}`);
            }
          }}
        >
          Register now
        </Button>
        <Button
          icon={<MdRefresh />}
          variant="secondary"
          size="lg"
          onClick={generateName}
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export { NamesGenerator };
