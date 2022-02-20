import { Allergen } from "./type"

export type State = {
    allergens: Allergen[]
}

export const state: State = {
    allergens: []
}