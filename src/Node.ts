import P5, { Vector } from "p5";
import { random } from "./Util";

export class Node extends Vector {
  private vel: P5.Vector;
  private diameter: number;
  private velocityScale = 5;
  private p5: P5;
  public isFrozen = false;
  public isSeed = false;

  constructor(p5: P5, diameter: number, energy: number, isSeed?: boolean) {
    super();
    const x = p5.random(p5.width);
    const y = p5.random(p5.height);
    this.set(x, y);
    this.velocityScale = energy;
    this.vel = Vector.random2D().mult(this.velocityScale);
    this.diameter = diameter;
    this.p5 = p5;
    this.isFrozen = isSeed || false;
    this.isSeed = isSeed || false;
  }

  public tick() {
    this.vel.set(Vector.random2D()).mult(this.velocityScale);
    if (!this.isFrozen) {
      this.add(this.vel);
    }
  }

  public draw() {
    this.isFrozen ? this.p5.stroke("blue") : this.p5.stroke(255);
    this.p5.noFill();
    this.p5.circle(this.x, this.y, this.diameter);

    //eye
    // const longVel = P5.Vector.mult(this.vel, this.diameter);
    // const eye = P5.Vector.add(longVel, this);
    // this.p5.line(this.x, this.y, eye.x, eye.y);
  }

  public intersects(other: Node) {
    if (this.dist(other) < this.diameter / 2 + other.diameter / 2) {
      return true;
    }
  }
}

export const createRandomNodes = (
  p5: P5,
  count: number,
  diameter: number,
  energy: number
) => {
  let nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push(new Node(p5, diameter, energy));
  }
  return nodes;
};
