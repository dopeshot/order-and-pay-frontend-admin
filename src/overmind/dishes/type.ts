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
    allergenIds: Allergen[] // id ref: 'Allergy
    labelIds: Label[] // id ref: 'Label'
}

export type Dish = DishDto & {
    _id: string,
    status: Status
}
