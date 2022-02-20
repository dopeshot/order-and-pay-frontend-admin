const titleSuffix = ' | Order and Pay'

export const setDocumentTitle = (title: string, displaySuffix = true) => {
    document.title = `${title}${displaySuffix ? titleSuffix : ''}`
}
