import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  starWars,
} from "unique-names-generator";
import { MetaNamesConfig } from "@/lib/metanames";

type Category = "all" | "adjectives" | "names" | "starwars" | "colors";

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
      return names.concat(adjectives, colors, starWars);
  }
};

const generateRandomName = (category: Category = "all", wordCount: number = 2) => {
  const dict = getDictionary(category);
  
  // unique-names-generator needs each word to come from a separate dictionary
  // So we duplicate the dictionary array to create enough "dictionary slots"
  const dictionaries = Array(wordCount).fill(dict);
  
  const customConfig = {
    dictionaries,
    separator: "-",
    length: wordCount,
  };
  
  return uniqueNamesGenerator(customConfig).toLocaleLowerCase();
};

export const generateMetaName = (category: Category = "all", wordCount: number = 2) => {
  const generatedName = generateRandomName(category, wordCount);
  return `${generatedName}.${MetaNamesConfig.tld}`;
};

export type { Category };
