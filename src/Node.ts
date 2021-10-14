import P5, { Vector } from "p5";

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
    // const x = this.p5.noise(this.x, this.y);
    // const y = this.p5.noise(this.x, this.y);
    const x = this.p5.map(Math.random(), 0, 1, -1, 1);
    const y = this.p5.map(Math.random(), 0, 1, -1, 1);

    this.vel.set(x, y).mult(this.velocityScale);
    if (!this.isFrozen) {
      this.add(this.vel);
    }
  }

  public draw() {
    //
    const fillColor = this.p5.map(this.velocityScale, 0, 10, 0, 255);
    this.p5.strokeWeight(0.5);
    this.p5.noStroke();
    // this.isFrozen ? this.p5.stroke("red") : this.p5.stroke(100, 100, 100, 80);
    this.isFrozen
      ? this.p5.fill(255, 0, 0, 200)
      : this.p5.fill(fillColor, fillColor, fillColor, 70);
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

  /**
   * Defines the action that should be taken when this node "bounces" on another.
   *
   * //TODO bounce should support an explicit list of bevaviors which can be interchanged using a paramter.
   *  // then simulations could be made with patches of different collsison action slected when calling bounce
   *
   * This relies on the node parent to facilitate detecting collision and calling `bounce`.
   * @param other The node to bounce off of
   */
  public bounce(other: Node) {
    // apply bounce to my vel
    const dir = Vector.sub(this, other).normalize();
    const bounceVector = dir.mult(10);
    // change vel to bouncevecotr or add it or something
    this.velocityScale = 10;
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
