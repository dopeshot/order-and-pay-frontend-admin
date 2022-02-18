import { Context } from "..";
import { Category } from "../dishes/effects";
import { CategoryDto } from "./effects";

// Create a category
export const createCategory = async ({ effects }: Context, categoryDto: CategoryDto): Promise<boolean> => {
    try {
        // We just await the creation no need to update category object
        await effects.categories.createCategory(categoryDto)
        return true
    } catch (error) {
        console.error(error)
        throw (error)
    }
}

// Get category by id action
export const getCategoryById = async ({ state, effects }: Context, id: string): Promise<Category> => {
    try {
        const response = await effects.categories.getCategoryById(id)
        const category = response.data
        return category
    } catch (error) {
        console.error(error)
        throw (error)
    }
}