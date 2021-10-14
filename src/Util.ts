import P5 from "p5";

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// make a fill function that wraps p5.fill and takes array of numbers as parameters

/**
 * Get the center of the window as a native vector
 */
export const center = (p5: P5) => {
  return p5.createVector(p5.width / 2, p5.height / 2);
};
