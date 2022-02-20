import { Status } from "../../types/status"

export type CategoryDto = {
    title: string
    description?: string
    icon?: string
    image?: string
    choices: Choice[]
    menuId: string // id ref: 'Menu'
}

export type CategoryDtoWithoutChoices = {
    title: string
    description?: string
    icon?: string
    image?: string
    menuId: string // id ref: 'Menu'
}

export type Category = {
    _id: string
    title: string
    description?: string
    icon?: string
    image?: string
    choices: Choice[]
    menuId: string // id ref: 'Menu'
    status: Status
}

export type ChoiceDto = {
    title: string,
    type: ChoiceType
}

export type Choice = {
    id: number
    title: string
    type: ChoiceType
    isDefault?: number | null // id of option
    options: Option[]
}

export type OptionDto = {
    title: string
    price: number
    isDefault: boolean
}

export type Option = {
    id: number
    title: string
    price: number
}

export enum ChoiceType {
    CHECKBOX = 'checkbox',
    RADIO = 'radio'
}
