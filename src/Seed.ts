import { Node } from "./Node";
import P5 from "p5";

export type SeedConfigBase = {
  p: P5;
  type: "point" | "line";
  energy?: number;
  diameter?: number;
};

export interface PointSeedConfig extends SeedConfigBase {
  type: "point";
  x?: number;
  y?: number;
}

export interface LineSeedConfig extends SeedConfigBase {
  type: "line";
  x?: number;
  y?: number;
  density: number; // 0 - 1
}

export type SeedConfig = PointSeedConfig | LineSeedConfig;

export const getSeed = (config: SeedConfig): Node[] => {
  switch (config.type) {
    // todo more versatile
    case "line":
      const diameter = config.diameter ?? 10;
      const numberOfNodes = (config.density * config.p.width) / diameter;
      let offset = diameter / 2;
      let seeds: Node[] = [];
      console.log(numberOfNodes);
      for (let i = 0; i < numberOfNodes; i++) {
        const seed = new Node(config.p, diameter, config.energy ?? 1, true);
        seed.set(offset, config.y ?? config.p.height - diameter);
        seeds.push(seed);
        offset += diameter;
      }
      return seeds;
    case "point":
    default:
      const seed = new Node(
        config.p,
        config.diameter ?? 10,
        config.energy ?? 1,
        true
      );
      seed.set(config.x ?? 0, config.y ?? 0);
      return [seed];
  }
};
