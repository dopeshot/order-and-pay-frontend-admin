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

export type CategoriesDto = {
    _id: string
    title: string
    description: string
    icon: string
    image: string
    choices: Choice[]
    menu: string // id ref: 'Menu'
}

// Create a Dish
export const createDish = (createDishDto: DishDto) => request.post<DishDto>('/dishes', createDishDto)
// Get a dish by id
export const getDishById = (id: string) => request.get<Dish>(`/dishes/${id}`)
// Update a dish
export const updateDish = (id: string, dish: DishDto) => request.patch<DishDto>(`/dishes/${id}`, dish)
// Delete a dish
export const deleteDish = (id: string) => request.delete(`/dishes/${id}`)

// Get all Categories TODO: needs to be moved when editor done
export const getAllCategories = () => request.get<CategoriesDto[]>('/categories')
