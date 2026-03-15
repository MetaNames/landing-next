import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  starWars,
} from "unique-names-generator";
import { MetaNamesConfig } from "@/lib/metanames";

export type Category = "all" | "adjectives" | "names" | "starwars" | "colors";

const CATEGORY_LABELS: Record<Category, string> = {
  all: "Mixed",
  adjectives: "Adjectives",
  names: "Names",
  starwars: "Star Wars",
  colors: "Colors",
} as const;

const WORD_COUNTS = [1, 2, 3] as const;
type WordCount = (typeof WORD_COUNTS)[number];

// Clean Star Wars names - keep only first word (some names have spaces)
const cleanStarWars = starWars.map((name) => name.split(" ")[0]);

const getDictionary = (category: Category): string[] => {
  switch (category) {
    case "adjectives":
      return adjectives;
    case "names":
      return names;
    case "starwars":
      return cleanStarWars;
    case "colors":
      return colors;
    case "all":
    default:
      return names.concat(adjectives, colors, cleanStarWars);
  }
};

const generateRandomName = (category: Category, wordCount: WordCount): string => {
  const dict = getDictionary(category);
  
  // unique-names-generator requires each word to come from a separate dictionary
  // Duplicate the dictionary array for each word count
  const dictionaries = Array(wordCount).fill(dict);
  
  const config = {
    dictionaries,
    separator: "-",
    length: wordCount,
  };
  
  return uniqueNamesGenerator(config).toLocaleLowerCase();
};

export const generateMetaName = (category: Category = "all", wordCount: WordCount = 2): string => {
  const generatedName = generateRandomName(category, wordCount);
  return `${generatedName}.${MetaNamesConfig.tld}`;
};

export { CATEGORY_LABELS, WORD_COUNTS };
export type { WordCount };
