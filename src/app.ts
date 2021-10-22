import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Node, createRandomNodes } from "./Node";
import { getSeed, SeedConfig } from "./Seed";

// simulation parameters
const numberOfNodes = 3000;
const nodeDiameter = 10;
const energy = 1;

// todo repulse
// or todo bounce
var sketch = (p: P5) => {
  let nodes: Node[];

  const configurations: { [key: string]: SeedConfig } = {
    point: {
      p: p,
      type: "point",
      diameter: nodeDiameter,
      energy: energy,
      x: p.width / 2,
      y: p.height / 2,
    },
    line: {
      p: p,
      type: "line",
      diameter: nodeDiameter,
      energy: energy,
      y: p.height + 10,
      density: 1,
    },
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    nodes = createRandomNodes(p, numberOfNodes, nodeDiameter, energy);

    // Get a seed and add it to nodes
    nodes.push(...getSeed(configurations["line"]));
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);

    nodes.forEach((i) => {
      // could optimize. This is the "freeze rule" and "bounce rule"
      if (i.isSeed) {
        // do nothing
      } else {
        nodes.forEach((j) => {
          const isIntersecting = i !== j && i.intersects(j);
          if (isIntersecting && j.isFrozen) {
            i.freeze(j);
          } else if (isIntersecting) {
            i.bounce(j);
          }
        });
      }

      i.tick();
    });

    nodes.forEach((c) => {
      c.draw();
    });
  };
};

new P5(sketch);
