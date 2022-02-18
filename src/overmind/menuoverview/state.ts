import { Dish } from "../dishes/effects"

export enum Status {
    ACTIVE = "active",
    DELETED = "deleted"
}

export type Category = {
    _id: string
    title: string
    description: string
    icon: string
    image: string
    choices: Choice[]
    dishes: Dish[]
    menu: string // id ref: 'Menu'
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

export type Menu = {
    _id: string
    title: string
    description: string
    status: Status
    isActive: boolean
    categories: Category[]
}

export type State = {
    isLoadingMenu: boolean
    menu: Menu | null
}

export const state: State = {
    isLoadingMenu: false,
    menu: null
}