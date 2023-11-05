interface DirtyDozenChemicals {
    bha: string[],
    coalTarDyes: string[],
    dea: string[],
    pthalates: string[],
    formaldehydes: string[],
    parabens: string[],
    fragrance: string[],
    peg: string[],
    petrolatum: string[],
    siloxanes: string[],
    sulfates: string[],
    triclosan: string[],
}

interface ExtensionMessage {
    sender: string,
    siteSupported: boolean,
    data?: {
        ingredientsListFound: boolean,
        ingredientsOfConcernFound?: boolean,
        ingredientsList?: string[],
    }
}