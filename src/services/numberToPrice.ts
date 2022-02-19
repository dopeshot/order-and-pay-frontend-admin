export const numberToPrice = (number: number): string => {
    return (number / 100).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });
}