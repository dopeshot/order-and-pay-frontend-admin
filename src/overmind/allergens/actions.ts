import { Context } from ".."
import { AllergenDto } from "./effects"

export const getAllAllergens = async ({ state, effects }: Context) => {
    try {
        const response = await effects.allergens.getAllergens()
        const allergens = response.data
        state.allergens.allergens = allergens
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
    }
}

export const createAllergen = async ({ state, effects }: Context, allergen: AllergenDto): Promise<boolean> => {
    try {
        const response = await effects.allergens.createAllergen(allergen)
        const newAllergen = response.data
        state.allergens.allergens = [...state.allergens.allergens, newAllergen]
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const updateAllergen = async ({ state, effects }: Context, { id, allergen }: { id: string, allergen: AllergenDto }): Promise<boolean> => {
    try {
        const response = await effects.allergens.updateAllergen(id, allergen)
        const updatedAllergen = response.data
        const index = state.allergens.allergens.findIndex(allergen => allergen._id === id)
        state.allergens.allergens[index] = updatedAllergen
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const deleteAllergen = async ({ state, effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.allergens.deleteAllergen(id)
        state.allergens.allergens = state.allergens.allergens.filter(allergen => allergen._id !== id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        return false
    }
}