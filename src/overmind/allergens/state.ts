export type Allergen = {
    _id: string
    title: string
    icon: string
}

export type State = {
    isLoadingAllergens: boolean
    allergens: Allergen[]
}

export const state: State = {
    isLoadingAllergens: false,
    allergens: []
}