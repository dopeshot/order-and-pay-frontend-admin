/**
 * Formats number to Price in Euro
 * @param number that we want to Format
 * @returns Formated Price
 */
export const numberToPrice = (number: number): string => {
    return (number / 100).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });
}