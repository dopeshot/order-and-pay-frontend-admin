import { Context } from ".."

export const onInitializeOvermind = ({ state, actions }: Context): void => {
    window.addEventListener("resize", actions.app.checkIsMobile)
}

export const checkIsMobile = ({ state }: Context): void => {
    state.app.isMobile = window.innerWidth < 768
}

export const toggleSidebar = ({ state }: Context): void => {
    state.app.layoutIsSideBarOpen = !state.app.layoutIsSideBarOpen
}

export const closeSidebar = ({state}: Context): void => {
    state.app.layoutIsSideBarOpen = false
}