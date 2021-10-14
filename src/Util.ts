export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// make a fill function that wraps p5.fill and takes array of numbers as parameters
