interface DirtyDozenChemicals {
  bha: string[];
  coalTarDyes: string[];
  dea: string[];
  pthalates: string[];
  formaldehydes: string[];
  parabens: string[];
  fragrance: string[];
  peg: string[];
  petrolatum: string[];
  siloxanes: string[];
  sulfates: string[];
  triclosan: string[];
}

// list of ingredients to search for
// source: https://davidsuzuki.org/living-green/dirty-dozen-cosmetic-chemicals-avoid/
export const dirtyDozen: DirtyDozenChemicals = {
  bha: ["BHA", "butylated hydroxyanisole", "BHT", "butylated hydroxytulolene"],
  coalTarDyes: ["p-phenylenediamine", "CI"],
  dea: [
    "DEA",
    "diethanolamine",
    "MEA",
    "monoethanolamide",
    "TEA",
    "triethanolamine",
  ],
  pthalates: ["DBP", "dibutyl phthalate", "DEP", "diethyl phthalate"],
  formaldehydes: [
    "menthenamine",
    "quaternium-15",
    "DMDM hydantoin",
    "imidazolidinyl urea",
    "sodium hydroxymethylglycinate",
  ],
  parabens: [
    "paraben",
    "methylparaben",
    "butylparaben",
    "propylparaben",
    "isobutylparaben",
    "ethylparaben",
  ],
  fragrance: ["parfum", "diethyl phthalate", "DEP"],
  peg: ["PEG", "polyethylene glycol", "propylene glycol", "1,4-dioxane"],
  petrolatum: ["petrolatum"],
  siloxanes: [
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
  sulfates: ["sodium laureth sulfate", "SLES", "sodium lauryl sulfate", "SLS"],
  triclosan: ["triclosan"],
};

export interface ExtensionMessage {
  sender: string;
  siteSupported: boolean;
  data?: {
    ingredientsListFound: boolean;
    ingredientsOfConcernFound?: boolean;
    ingredientsList?: string[];
  };
}
