import { MenuPopulated } from "../menus/type"

export type State = {
    menu: MenuPopulated | null
}

export const state: State = {
    menu: null
}