import P5 from "p5";
import { Node } from "./Node";

export type UNodeType = "default" | "inflation";
export class UNode extends Node {
  // Will represent the "special power" of the unode.
  // This power will influence the growth of the dla structure
  // (i.e. adding to the size of the frozen node, taking away, multiplying,
  // adding more data like texture or items, effects such as producing
  // other dio-symed phenomena like Differential Growth or Reaction diffusion explosion/gliders)
  private type: UNodeType;

  // todo how can i not reiterate the params
  constructor(
    p5: P5,
    diameter: number,
    energy: number,
    type?: UNodeType,
    isSeed?: boolean
  ) {
    super(p5, diameter, energy, isSeed);
    this.type = type ?? "default";
  }
}
