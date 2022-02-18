import { Context } from "..";
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