import { request } from "../../services/axios"
import { Allergen } from "../allergens/state"
import { Label } from "../labels/state"

export type DishDto = {
    title: string
    description: string
    image?: string
    isAvailable: boolean
    price: number
    categoryId: Category | string // id ref: 'Category'
    allergenIds: Allergen[] // id ref: 'Allergy
    labelIds: Label[] // id ref: 'Label'
}

export type Dish = DishDto & { _id: string }

enum ChoiceType {
    RADIO = "radio",
    CHECKBOX = "checkbox"
}

type Option = {
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

export type Category = {
    _id: string
    title: string
    description: string
    icon: string
    image: string
    choices: Choice[]
    menuId: string // id ref: 'Menu'
}

// Create a Dish
export const createDish = (createDishDto: DishDto) => request.post<Dish>('/dishes', createDishDto)
// Get a dish by id
export const getDishById = (id: string) => request.get<Dish>(`/dishes/${id}`)
// Update a dish
export const updateDish = (id: string, dish: DishDto) => request.patch<Dish>(`/dishes/${id}`, dish)
// Delete a dish
export const deleteDish = (id: string) => request.delete(`/dishes/${id}?type=hard`)
// Get all Categories
export const getAllCategories = () => request.get<Category[]>('/categories')
