const titleSuffix = ' | Order and Pay'

/**
 * Set document title for every document
 * @param title that we want to set
 * @param displaySuffix default true, display Order and Pay suffix
 */
export const setDocumentTitle = (title: string, displaySuffix = true) => {
    document.title = `${title}${displaySuffix ? titleSuffix : ''}`
}
