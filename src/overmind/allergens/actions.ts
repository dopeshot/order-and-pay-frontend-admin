import axios from "axios"
import { Context } from ".."
import { AllergenDto } from "./effects"

export const getAllAllergens = async ({ state, effects, actions }: Context) => {
    try {
        const response = await effects.allergens.getAllergens()
        const allergens = response.data
        state.allergens.allergens = allergens
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Allergene",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
    }
}

export const createAllergen = async ({ state, actions, effects }: Context, allergen: AllergenDto): Promise<true> => {
    try {
        const response = await effects.allergens.createAllergen(allergen)
        const newAllergen = response.data
        state.allergens.allergens = [...state.allergens.allergens, newAllergen]
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Allergens",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })
        throw (error)
    }
}

export const updateAllergen = async ({ state, actions, effects }: Context, { id, allergen }: { id: string, allergen: AllergenDto }): Promise<true> => {
    try {
        const response = await effects.allergens.updateAllergen(id, allergen)
        const updatedAllergen = response.data
        const index = state.allergens.allergens.findIndex(allergen => allergen._id === id)
        state.allergens.allergens[index] = updatedAllergen
        return true
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Aktualisieren des Allergens",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

export const deleteAllergen = async ({ state, actions, effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.allergens.deleteAllergen(id)
        state.allergens.allergens = state.allergens.allergens.filter(allergen => allergen._id !== id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Löschen des Allergens",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        return false
    }
}