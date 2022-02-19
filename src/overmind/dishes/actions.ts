import { Context } from ".."
import { Category, Dish, DishDto } from "./effects"

/**
 * Create new Dish
 */
export const createDish = async ({ effects }: Context, dish: DishDto): Promise<boolean> => {
    try {
        await effects.dishes.createDish(dish)
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

/**
 * Get one Dish by id
 */
export const getDishById = async ({ effects }: Context, id: string): Promise<Dish> => {
    try {
        const response = await effects.dishes.getDishById(id)
        const dish = response.data
        return dish
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

/**
 * Update one Dish by id
 */
export const updateDish = async ({ effects }: Context, { dishId, dish }: { dishId: string, dish: DishDto }): Promise<boolean> => {
    try {
        // We just await the update no need to update menu object
        await effects.dishes.updateDish(dishId, dish)
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

/**
 * Delete one Dish by id
 */
export const deleteDish = async ({ effects }: Context, id: string): Promise<boolean> => {
    try {
        await effects.dishes.deleteDish(id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
    }
}

/**
 * Get All Categories
 */
export const getAllCategories = async ({ effects }: Context): Promise<Category[]> => {
    try {
        const response = await effects.dishes.getAllCategories()
        const categories = response.data
        return categories
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
    }
}