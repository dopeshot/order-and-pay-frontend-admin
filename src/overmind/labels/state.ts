export type Label = {
    _id: string
    title: string
    icon: string
}

export type State = {
    labels: Label[]
}

export const state: State = {
    labels: []
}