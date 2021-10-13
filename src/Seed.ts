import { Node } from "./Node";
import P5 from "p5";

export type SeedConfigBase = {
  p: P5;
  type: "point";
};

export interface PointSeedConfig extends SeedConfigBase {
  type: "point";
  x?: number;
  y?: number;
  energy?: number;
  diameter?: number;
}

export type SeedConfig = PointSeedConfig;

export const getSeed = (config: SeedConfig) => {
  switch (config.type) {
    case "point":
    default:
      const seed = new Node(
        config.p,
        config.diameter ?? 10,
        config.energy ?? 1,
        true
      );
      seed.set(config.x ?? 0, config.y ?? 0);
      return seed;
  }
};
