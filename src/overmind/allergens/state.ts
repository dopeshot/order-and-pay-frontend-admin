export type Allergen = {
    _id: string
    title: string
    icon: string
}

export type State = {
    allergens: Allergen[]
}

export const state: State = {
    allergens: []
}