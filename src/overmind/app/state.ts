export type State = {
    layoutIsSideBarOpen: boolean,
    languageLocale: string
}

export const state: State = {
    layoutIsSideBarOpen: true,
    languageLocale: 'de-DE' // BCP 47 Sprachcode 
}