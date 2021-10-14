import p5 from "p5";
import P5, { Vector } from "p5";
import { center } from "./Util";

export class Node extends Vector {
  private vel: P5.Vector;
  private diameter: number;
  private velocityScale = 5;
  private bounceEnergy = 5;
  private p5: P5;
  public isFrozen = false;
  public isSeed = false;
  private attached: Node[] = [];

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
    // todo could add minor random motion in between collisions
    // this.randomMotion();
    if (!this.isFrozen) {
      this.add(this.vel);
    }
    this.reflectOnBorders();
    // todo the nodes could respect a swaying wind force when frozen to add visual interest and dynamics to the growth.
  }

  private reflectOnBorders() {
    if (this.x >= this.p5.width || this.x <= 0) {
      this.vel.set(this.vel.x * -1, this.vel.y);
    }

    if (this.y >= this.p5.height || this.y <= 0) {
      this.vel.set(this.vel.x, this.vel.y * -1);
    }
  }

  private randomMotion() {
    // const x = this.p5.noise(this.x, this.y);
    // const y = this.p5.noise(this.x, this.y);
    const x = this.p5.map(Math.random(), 0, 1, -1, 1);
    const y = this.p5.map(Math.random(), 0, 1, -1, 1);

    this.vel.set(x, y).mult(this.velocityScale);
  }

  public draw() {
    // this.drawDefault(true, false);
    this.lineGrowthDrawStyle(true);

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
    const bounceVector = dir.mult(this.bounceEnergy);

    // Infectious?
    // this.velocityScale = 10;

    // Vector replace
    this.vel.set(bounceVector);
  }

  /**
   * Defines the action that should be taken when this node "freezes" against another.
   *
   * This relies on the node parent to facilitate detecting collision and calling `freeze`.
   * @param other The node to freeze against
   */
  public freeze(other: Node) {
    this.attached.push(other);
    this.isFrozen = true;
  }

  // todo this and other draw calls could be optimized with push and pop
  private drawDefault = (drawFreeNodes?: boolean, drawFrozen?: boolean) => {
    const fillColor = this.p5.map(this.velocityScale, 0, 10, 0, 255);
    this.p5.strokeWeight(0.5);
    this.p5.noStroke();
    // this.isFrozen ? this.p5.stroke("red") : this.p5.stroke(100, 100, 100, 80);
    if (drawFrozen && this.isFrozen) {
      this.p5.fill(255, 0, 0, 200);
    } else if (drawFreeNodes && !this.isFrozen) {
      this.p5.fill(fillColor, fillColor, fillColor, 70);
    } else {
      this.p5.noFill(); // hacky
    }
    this.p5.circle(this.x, this.y, this.diameter);
  };

  private lineGrowthDrawStyle = (taper?: boolean) => {
    // todo abstract linGrowth into center and vertical type sto match seed
    // const fillColor = this.p5.map(
    //   this.y,
    //   this.p5.height,
    //   this.p5.height - this.p5.height / 5,
    //   0,
    //   255
    // );
    const fillColor = this.p5.map(
      Vector.dist(
        this,
        this.p5.createVector(this.p5.width / 2, this.p5.height / 2)
      ),
      0,
      Math.min(this.p5.width, this.p5.height) / 2,
      255,
      0
    );
    const spread = Math.min(this.p5.width, this.p5.height) / 3;
    const defaultStrokeWeight = 4;
    const strokeWeightRaw = Vector.dist(this, center(this.p5));
    const strokeWeightMin = 0.5;
    const strokeWeightMax = 10;
    const strokeWeight = this.p5.map(
      strokeWeightRaw,
      0,
      spread,
      strokeWeightMax,
      strokeWeightMin
    );
    this.p5.strokeWeight(taper ? strokeWeight : defaultStrokeWeight);
    this.p5.stroke(fillColor, fillColor, fillColor);
    this.attached.forEach((a) => this.p5.line(this.x, this.y, a.x, a.y));
  };
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
