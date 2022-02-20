import { derived } from "overmind"

export type State = {
    layoutIsSideBarOpen: boolean,
    isMobile: boolean,
    languageLocale: string,
    layoutIsSmallSidebar: boolean
}

export const state: State = {
    layoutIsSideBarOpen: !(window.innerWidth < 768),
    isMobile: window.innerWidth < 768,
    languageLocale: 'de-DE', // BCP 47 Sprachcode 
    layoutIsSmallSidebar: derived((state: State) => !state.isMobile && !state.layoutIsSideBarOpen)
}
