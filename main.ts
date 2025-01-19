interface IFigure {
  readonly name: string;
  readonly color: string;
  calculateArea(): number;
  calculatePerimeter(): number;
  printInfo(): void;
}

abstract class Figure implements IFigure {
  readonly name: string;
  readonly color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  printInfo(): void {
    console.log(`Figure: ${this.name}, Color: ${this.color}`);
    console.log(`Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}`);
  }
}

abstract class CirculeFigure extends Figure {
  printDiameter(radius: number | Array<number>): void {
    if (Array.isArray(radius)) {
      radius.forEach((value) => {
        console.log(`Figure radius: ${value}`);
      });
    } else {
      console.log(`Figure radius: ${radius}`);
    }
  }
}

class Circle extends CirculeFigure {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly radius: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Ellipse extends CirculeFigure {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly radius: Array<number>
  ) {
    super(name, color);
    if (radius.length !== 2) {
      throw new Error("Ellipse must have exactly two radii.");
    }
  }

  calculateArea(): number {
    return Math.PI * this.radius[0] * this.radius[1];
  }

  calculatePerimeter(): number {
    const [a, b] = this.radius;
    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }
}

abstract class PolygonFigure extends Figure {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly sides: Array<number>
  ) {
    super(name, color);
  }

  getNumberOfSides(): number {
    return this.sides.length;
  }

  abstract calculateArea(): number;

  calculatePerimeter(): number {
    return this.sides.reduce((sum, side) => sum + side, 0);
  }

  abstract printAreaFormula(): void;
}

class Rectangle extends PolygonFigure {
  constructor(name: string, color: string, sides: Array<number>) {
    super(name, color, sides);
    if (sides.length !== 2) {
      throw new Error("Rectangle must have exactly two sides.");
    }
  }

  calculateArea(): number {
    return this.sides[0] * this.sides[1];
  }

  printAreaFormula(): void {
    console.log(`${this.sides[0]} * ${this.sides[1]} = ${this.calculateArea()}`);
  }
}

class Square extends PolygonFigure {
  constructor(name: string, color: string, sides: Array<number>) {
    super(name, color, sides);
    if (sides.length !== 1) {
      throw new Error("Square must have exactly one unique side length.");
    }
  }

  calculateArea(): number {
    return Math.pow(this.sides[0], 2);
  }

  printAreaFormula(): void {
    console.log(`${this.sides[0]} ^ 2 = ${this.calculateArea()}`);
  }
}

class Triangle extends PolygonFigure {
  constructor(name: string, color: string, sides: Array<number>) {
    super(name, color, sides);

    if (sides.length !== 3) {
      throw new Error("Triangle must have exactly three sides.");
    }

    const [a, b, c] = sides;
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("The sides do not satisfy the triangle inequality.");
    }
  }

  calculateArea(): number {
    const p: number = (this.sides[0] + this.sides[1] + this.sides[2]) / 2;
    return Math.sqrt(p * (p - this.sides[0]) * (p - this.sides[1]) * (p - this.sides[2]));
  }

  printAreaFormula(): void {
    const p: number = (this.sides[0] + this.sides[1] + this.sides[2]) / 2;
    console.log(`p = (${this.sides[0]} + ${this.sides[1]} + ${this.sides[2]}) / 2 = ${p}`);
    console.log(
      `√(p * (p - ${this.sides[0]}) * (p - ${this.sides[1]}) * (p - ${this.sides[2]})) = ${this.calculateArea()}`
    );
  }

  printTriangleType(): void {
    const [a, b, c] = this.sides;

    if (a === b && b === c) {
      console.log("Equilateral triangle.");
    } else if (a === b || b === c || a === c) {
      console.log("Isosceles triangle.");
    } else {
      console.log("Scalene triangle.");
    }
  }

  calcHeight(baseSideIndex: number): number {
    if (baseSideIndex < 0 || baseSideIndex >= this.sides.length) {
      throw new Error("Invalid base side index.");
    }

    const base = this.sides[baseSideIndex];
    if (base === 0) {
      throw new Error("Base side cannot be zero.");
    }

    const area = this.calculateArea();
    return (2 * area) / base;
  }
}

class Polygon extends PolygonFigure {
  constructor(name: string, color: string, sides: Array<number>) {
    super(name, color, sides);
  }

  calculateArea(): number {
    throw new Error(
      "Cannot calculate the area of a general polygon without additional information (e.g., vertex coordinates)."
    );
  }

  printAreaFormula(): void {
    console.log(
      "Area formula for a general polygon is not defined without additional data (e.g., vertex coordinates)."
    );
  }
}
