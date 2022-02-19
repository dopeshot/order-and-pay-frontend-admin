import { request } from "../../services/axios"
import { Category } from "../dishes/effects"

export type CategoryDto = {
    title: string
    description: string
    icon: string
    image: string
    choices: Choice[]
    menuId: string // id ref: 'Menu'
}

export type Option = {
    id: number
    name: string
    price: number
}

export type Choice = {
    id: number
    title: string
    type: ChoiceType
    default?: number // id of option
    options: Option[]
}

export enum ChoiceType {
    RADIO = "radio",
    CHECKBOX = "checkbox"
}

// Create a category
export const createCategory = (categoryDto: CategoryDto) => request.post<Category>('/categories', categoryDto)
// Get category by id
export const getCategoryById = (id: string) => request.get<Category>(`/categories/${id}`)
// Update category by id
export const updateCategory = (id: string, category: CategoryDto) => request.patch<Category>(`/categories/${id}`, category)
// Delete category by id
export const deleteCategory = (id: string) => request.delete(`/categories/${id}?type=hard`)