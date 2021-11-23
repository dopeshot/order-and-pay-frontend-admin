export type State = {
    layoutIsSideBarOpen: boolean,
    isMobile: boolean,
    languageLocale: string
}

export const state: State = {
    layoutIsSideBarOpen: window.innerWidth < 768 ? false : true, 
    isMobile: window.innerWidth < 768,
    languageLocale: 'de-DE' // BCP 47 Sprachcode 
}