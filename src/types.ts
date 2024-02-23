type Category =
  | "bha"
  | "coalTarDyes"
  | "dea"
  | "pthalates"
  | "formaldehydes"
  | "parabens"
  | "fragrance"
  | "peg"
  | "petrolatum"
  | "siloxanes"
  | "sulfates"
  | "triclosan";

export type data = {
  chemicals: string[];
  hazards: string[];
};
export type DirtyDozenChemicals = Record<Category, data>;

// list of ingredients to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
export const dirtyDozenList: DirtyDozenChemicals = {
  bha: {
    chemicals: [
      "BHA",
      "butylated hydroxyanisole",
      "BHT",
      "butylated hydroxytulolene",
    ],
    hazards: [
      "possible skin irritant",
      "possible human carcinogen (BHA)",
      "possible endocrine disruptor",
    ],
  },
  coalTarDyes: {
    chemicals: ["p-phenylenediamine", "CI"],
    hazards: ["skin and eye irritant", "possible human carcinogen."],
  },
  dea: {
    chemicals: [
      "DEA",
      "diethanolamine",
      "MEA",
      "monoethanolamide",
      "TEA",
      "triethanolamine",
    ],
    hazards: ["skin and eye irritant", "possible human carcinogen."],
  },
  pthalates: {
    chemicals: ["DBP", "dibutyl phthalate", "DEP", "diethyl phthalate"],
    hazards: ["suspected endocrine disruptor", "reproductive toxicant"],
  },
  formaldehydes: {
    chemicals: [
      "menthenamine",
      "quaternium-15",
      "DMDM hydantoin",
      "imidazolidinyl urea",
      "sodium hydroxymethylglycinate",
    ],
    hazards: ["known human carcinogen."],
  },
  parabens: {
    chemicals: [
      "paraben",
      "methylparaben",
      "butylparaben",
      "propylparaben",
      "isobutylparaben",
      "ethylparaben",
    ],
    hazards: [
      "possible endocrine disruptor",
      "possible carcinogen",
      "possible reproductive toxicant",
    ],
  },
  fragrance: {
    chemicals: ["parfum", "diethyl phthalate", "DEP"],
    hazards: [
      "possible irritants can trigger allergies, migraines, and asthma symptoms",
    ],
  },
  peg: {
    chemicals: [
      "PEG",
      "polyethylene glycol",
      "propylene glycol",
      "1,4-dioxane",
    ],
    hazards: ["possible human carcinogen"],
  },
  petrolatum: {
    chemicals: ["petrolatum"],
    hazards: ["possible human carcinogen", "possible skin irritatant"],
  },
  siloxanes: {
    chemicals: [
      "cyclotetrasiloxane",
      "cylcopentasiloxane",
      "cyclohexasiloxane",
      "D4",
      "D5",
      "D6",
      "cyclomethicone",
      "polydimethylsiloxane",
      "PDMS",
      "dimethicone",
    ],
    hazards: ["possible endocrine disruptor", "possible reproductive toxicant"],
  },
  sulfates: {
    chemicals: [
      "sodium laureth sulfate",
      "SLES",
      "sodium lauryl sulfate",
      "SLS",
    ],
    hazards: [
      "possible human carcinogen",
      "possible developmental toxicant",
      "possible skin and eye irritant.",
    ],
  },
  triclosan: {
    chemicals: ["triclosan"],
    hazards: ["possible endocrine disruptor", "skin and eye irritant"],
  },
};

export interface ExtensionMessage {
  sender: string;
  siteSupported: boolean;
  data?: MessageData;
}
export interface ResultsList {
  category: string,
  hazards: string[]
}
export interface MessageData {
  ingredientsListFound: boolean;
  ingredientsOfConcernFound?: boolean;
  ingredientsList?: ResultsList[];
}
