import { Status } from "../../types/status"
import { Allergen } from "../allergens/type"
import { Label } from "../labels/type"

export type DishDto = {
    title: string
    description: string
    price: number
    image?: string
    isAvailable: boolean
    categoryId: string // id ref: 'Category'
    allergenIds: string[] // id ref: 'Allergy
    labelIds: string[] // id ref: 'Label'
}

export type Dish = DishDto & {
    _id: string,
    status: Status
}

export type DishPopulated = Dish & {
    allergenIds: Allergen[]
    labelIds: Label[]
}