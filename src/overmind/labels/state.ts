export type Label = {
    _id: string
    title: string
    icon: string
}

export type State = {
    isLoadingLabels: boolean
    labels: Label[]
}

export const state: State = {
    isLoadingLabels: false,
    labels: []
}