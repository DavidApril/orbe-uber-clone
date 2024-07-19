
export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('en-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}