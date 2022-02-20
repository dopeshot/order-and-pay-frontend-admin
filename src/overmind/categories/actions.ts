import axios from "axios";
import { Context } from "..";
import { Category } from "../dishes/effects";
import { CategoryDto } from "./effects";

/**
 * Get all categories request with error handling MC TODO: Error handling
 */
export const getAllCategories = async ({ effects }: Context): Promise<Category[]> => {
    try {
        const response = await effects.categories.getAllCategories()
        const categories = response.data
        return categories
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)
        throw (error)
    }
}

/**
 * Create a category request with error handling
 */
export const createCategory = async ({ effects, actions }: Context, categoryDto: CategoryDto): Promise<true> => {
    try {
        // We just await the creation no need to update category object
        await effects.categories.createCategory(categoryDto)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen der Kategorie",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 *  Get category by id request with error handling
 */
export const getCategoryById = async ({ effects, actions }: Context, id: string): Promise<Category> => {
    try {
        const response = await effects.categories.getCategoryById(id)
        const category = response.data
        return category
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Kategorie",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}
/**
 *  Update category by id request with error handling
 */
export const updateCategoryById = async ({ effects, actions }: Context, { id, category }: { id: string, category: CategoryDto }): Promise<true> => {
    try {
        // We just await the update no need to update menu object
        await effects.categories.updateCategory(id, category)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Erstellen der Kategorie",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}

/**
 *  Delete category by id request with error handling
 */
export const deleteCategoryById = async ({ effects, actions }: Context, id: string): Promise<true> => {
    try {
        // We just await the deletion no need to update menu object
        await effects.categories.deleteCategory(id)
        return true
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Löschen der Kategorie",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}
