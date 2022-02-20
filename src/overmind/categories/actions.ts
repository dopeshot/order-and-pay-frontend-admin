import axios from "axios";
import { Context } from "..";
import { Category } from "../dishes/effects";
import { CategoryDto } from "./effects";

// Create a category
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

// Get category by id action
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

// Update category by id action
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

// Delete category by id action 
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

// Get all categories action
export const getAllCategories = async ({ effects, actions }: Context): Promise<Category[]> => {
    try {
        const response = await effects.dishes.getAllCategories()
        const categories = response.data
        return categories
    } catch (error) /* istanbul ignore next // should not happen just fallback */ {
        console.error(error)

        actions.notify.createNotification({
            title: "Fehler beim Laden der Kategorien",
            message: axios.isAxiosError(error) && error.response ? error.response.data.message : "Netzwerk-Zeitüberschreitung",
            type: "danger"
        })

        throw (error)
    }
}