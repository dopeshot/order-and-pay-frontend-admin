import { request } from "../../services/axios"
import { Dish, DishDto } from "./type"

// Create a Dish
export const createDish = (createDishDto: DishDto) => request.post<Dish>('/dishes', createDishDto)
// Get a dish by id
export const getDishById = (id: string) => request.get<Dish>(`/dishes/${id}`)
// Patch a dish
export const updateDish = (id: string, dish: DishDto) => request.patch<Dish>(`/dishes/${id}`, dish)
// Delete a dish
export const deleteDish = (id: string) => request.delete(`/dishes/${id}?type=hard`)

