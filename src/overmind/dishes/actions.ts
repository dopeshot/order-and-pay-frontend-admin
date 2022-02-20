import axios from "axios"
import { Context } from ".."
import { Dish, DishDto } from "./effects"

/**
 * Create new Dish
 */
export const createDish = async ({ effects, actions }: Context, dish: DishDto): Promise<true> => {
    try {
        await effects.dishes.createDish(dish)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Gerichts",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Get one Dish by id
 */
export const getDishById = async ({ effects, actions }: Context, id: string): Promise<Dish> => {
    try {
        const response = await effects.dishes.getDishById(id)
        const dish = response.data
        return dish
    } catch (error) {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden des Gerichts",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Update one Dish by id
 */
export const updateDish = async ({ effects, actions }: Context, { dishId, dish }: { dishId: string, dish: DishDto }): Promise<true> => {
    try {
        // We just await the update no need to update menu object
        await effects.dishes.updateDish(dishId, dish)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Gerichts",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 * Delete one Dish by id
 */
export const deleteDish = async ({ effects, actions }: Context, id: string): Promise<true> => {
    try {
        await effects.dishes.deleteDish(id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen des Gerichts",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}
