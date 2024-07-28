export const parseNumberToText = (number: number) => {
  let numberText = number.toString();
  let textFormated = numberText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return textFormated;
};

export const parseTextToNumber = (cadena: string) => {
  let numberWithouFormat = cadena.replace(/\./g, '');
  let number = parseFloat(numberWithouFormat);

  return number;
};
