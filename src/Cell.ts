import P5 from "p5";

export class Cell {
  private position: P5.Vector;
  private velocity: P5.Vector;
  private direction: P5.Vector;
  private diameter: number;
  private velocityScale = 0.05;
  private p5: P5;

  constructor(p5: P5, diameter: number) {
    const x = p5.random(p5.width);
    const y = p5.random(p5.height);
    this.position = new P5.Vector().set(x, y);
    this.velocity = P5.Vector.random2D().mult(this.velocityScale);
    this.diameter = diameter;
    this.p5 = p5;
  }

  public tick() {
    this.position.add(this.velocity);
  }

  public draw() {
    this.p5.stroke(255);
    this.p5.noFill();
    this.p5.circle(this.position.x, this.position.y, this.diameter);

    const longVel = P5.Vector.mult(this.velocity, this.diameter);
    const eye = P5.Vector.add(longVel, this.position);

    this.p5.line(this.position.x, this.position.y, eye.x, eye.y);
  }
}

export const createRandomCells = (p5: P5, count: number) => {
  let cells: Cell[] = [];
  for (let i = 0; i < count; i++) {
    cells.push(new Cell(p5, 20));
  }
  return cells;
};
