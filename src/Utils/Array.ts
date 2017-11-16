export const popNumber = <T>(array: T[], number: number) => {
  const middleIndex = array.length < number ? 0 : array.length - number;
  return array.splice(middleIndex, number);
};
