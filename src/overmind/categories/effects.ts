export type CategoryDto = {
    title: string
    description: string
    icon: string
    image: string
    choices: Choice[]
    menu: string // id ref: 'Menu'
}

type Option = {
    id: number
    name: string
    price: number
}

type Choice = {
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