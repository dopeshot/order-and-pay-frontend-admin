import { request } from "../../services/axios"
import { Allergen } from "../allergens/type"
import { Label } from "../labels/type"

export type DishDto = {
    title: string
    description: string
    image?: string
    isAvailable: boolean
    price: number
    categoryId: string // id ref: 'Category'
    allergenIds: Allergen[] // id ref: 'Allergy
    labelIds: Label[] // id ref: 'Label'
}

export type Dish = DishDto & { _id: string }

// Create a Dish
export const createDish = (createDishDto: DishDto) => request.post<Dish>('/dishes', createDishDto)
// Get a dish by id
export const getDishById = (id: string) => request.get<Dish>(`/dishes/${id}`)
// Patch a dish
export const updateDish = (id: string, dish: DishDto) => request.patch<Dish>(`/dishes/${id}`, dish)
// Delete a dish
export const deleteDish = (id: string) => request.delete(`/dishes/${id}?type=hard`)

