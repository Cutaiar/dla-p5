import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Cell, createRandomCells } from "./Cell";

var sketch = (p: P5) => {
  let cells: Cell[];

  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");

    p.createCanvas(p.windowWidth, p.windowHeight);

    cells = createRandomCells(p, 100);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);

    cells.forEach((c) => {
      c.tick();
    });

    cells.forEach((c) => {
      c.draw();
    });
  };
};

new P5(sketch);
