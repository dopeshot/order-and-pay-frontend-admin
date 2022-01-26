export type Label = {
    _id: string
    title: string
    icon: string
}

export type State = {
    isLoadingLabels: boolean
    isLoadingCreateLabel: boolean
    isLoadingEditLabel: boolean
    isLoadingDeleteLabel: boolean
    labels: Label[]
}

export const state: State = {
    isLoadingLabels: false,
    isLoadingCreateLabel: false,
    isLoadingEditLabel: false,
    isLoadingDeleteLabel: false,
    labels: []
}