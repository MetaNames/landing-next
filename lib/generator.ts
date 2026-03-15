import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  starWars,
} from "unique-names-generator";
import { MetaNamesConfig } from "@/lib/metanames";

type Category = "all" | "adjectives" | "names" | "starwars" | "colors";

const allDictionaries = names.concat(adjectives, colors, starWars);

const getDictionary = (category: Category) => {
  switch (category) {
    case "adjectives":
      return adjectives;
    case "names":
      return names;
    case "starwars":
      return starWars;
    case "colors":
      return colors;
    case "all":
    default:
      return allDictionaries;
  }
};

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const generateRandomName = (category: Category = "all", wordCount: number = 2) => {
  const dict = getDictionary(category);
  
  // Ensure word count doesn't exceed dictionary length
  const safeWordCount = Math.min(wordCount, dict.length);
  
  const customConfig = {
    dictionaries: [shuffled(dict)],
    separator: "-",
    length: safeWordCount,
  };
  
  return uniqueNamesGenerator(customConfig).toLocaleLowerCase();
};

// Pre-shuffle dictionaries at startup
const shuffled = <T>(arr: T[]): T[] => shuffleArray(arr);

export const generateMetaName = (category: Category = "all", wordCount: number = 2) => {
  const generatedName = generateRandomName(category, wordCount);
  return `${generatedName}.${MetaNamesConfig.tld}`;
};

export type { Category };
