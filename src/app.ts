import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Node, createRandomNodes } from "./Node";
import { getSeed } from "./Seed";

// simulation parameters
const numberOfNodes = 700;
const nodeDiameter = 15;
const energy = 2;

// todo repulse
// or todo bounce
var sketch = (p: P5) => {
  let nodes: Node[];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    nodes = createRandomNodes(p, numberOfNodes, nodeDiameter, energy);

    // Get a seed and add it to nodes
    nodes.push(
      ...getSeed({
        p: p,
        type: "line",
        diameter: nodeDiameter,
        energy: energy,
        // x: p.width / 2,
        // y: p.height / 2,
        density: 1,
      })
    );
    // nodes.push(
    //   getSeed({
    //     p: p,
    //     type: "point",
    //     x: p.width / 2,
    //     y: p.height / 2,
    //     diameter: nodeDiameter,
    //     energy: energy,
    //   })
    // );
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);

    nodes.forEach((i) => {
      // could optimize. This is the "freeze rule"
      if (i.isSeed) {
      } else {
        if (nodes.some((j) => i !== j && i.intersects(j) && j.isFrozen)) {
          i.isFrozen = true;
        } else {
          nodes.forEach((j) => {
            if (i !== j && i.intersects(j)) {
              i.bounce(j);
            }
          });
        }
      }
      i.tick();
    });

    nodes.forEach((c) => {
      c.draw();
    });
  };
};

new P5(sketch);
