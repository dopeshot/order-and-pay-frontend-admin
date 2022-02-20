import { request } from "../../services/axios"
import { Category, CategoryDto } from "./type"

// Create a category
export const createCategory = (categoryDto: CategoryDto) => request.post<Category>('/categories', categoryDto)
// Get category by id
export const getCategoryById = (id: string) => request.get<Category>(`/categories/${id}`)
// Update category by id
export const updateCategory = (id: string, category: CategoryDto) => request.patch<Category>(`/categories/${id}`, category)
// Delete category by id
export const deleteCategory = (id: string) => request.delete(`/categories/${id}?type=hard`)
// Get all Categories
export const getAllCategories = () => request.get<Category[]>('/categories')