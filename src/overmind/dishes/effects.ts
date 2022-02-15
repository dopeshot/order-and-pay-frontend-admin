import { request } from "../../services/axios"

export type DishDto = {
    title: string
    description: string
    image?: string
    isActive: boolean
    price: number
    category: string // id ref: 'Category'
    allergens: string[] // id ref: 'Allergy
    labels: string[] // id ref: 'Label'
}

// Create a Dish
export const createDish = (createDishDto: DishDto) => request.post('/dishes', createDishDto)
// Get a dish by id
export const getDishById = (id: string) => request.get(`/dishes/${id}`)
// Update a dish
export const updateDish = (id: string, dish: DishDto) => request.patch(`/dishes/${id}`, dish)
// Delete a dish
export const deleteDish = (id: string) => request.delete(`/dishes/${id}`)
