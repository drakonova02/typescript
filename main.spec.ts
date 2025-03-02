import { describe, test, expect } from '@jest/globals';
import { Circle, Ellipse, Rectangle, Square, Triangle } from "./main";

describe("Circle", () => {
  test("should calculate area correctly", () => {
    const circle = new Circle("Circle", "red", 5);
    expect(circle.calculateArea()).toBeCloseTo(78.54, 2);
  });

  test("should calculate perimeter correctly", () => {
    const circle = new Circle("Circle", "red", 5);
    expect(circle.calculatePerimeter()).toBeCloseTo(31.42, 2);
  });
});

describe("Ellipse", () => {
  test("should calculate area correctly", () => {
    const ellipse = new Ellipse("Ellipse", "blue", [4, 6]);
    expect(ellipse.calculateArea()).toBeCloseTo(75.40, 2);
  });
});

describe("Rectangle", () => {
  test("should calculate area correctly", () => {
    const rectangle = new Rectangle("Rectangle", "green", [4, 6]);
    expect(rectangle.calculateArea()).toBe(24);
  });

  test("should calculate perimeter correctly", () => {
    const rectangle = new Rectangle("Rectangle", "green", [4, 6]);
    expect(rectangle.calculatePerimeter()).toBe(20);
  });
});

describe("Square", () => {
  test("should calculate area correctly", () => {
    const square = new Square("Square", "yellow", [4]);
    expect(square.calculateArea()).toBe(16);
  });

  test("should calculate perimeter correctly", () => {
    const square = new Square("Square", "yellow", [4]);
    expect(square.calculatePerimeter()).toBe(16);
  });
});

describe("Triangle", () => {
  test("should calculate area correctly", () => {
    const triangle = new Triangle("Triangle", "purple", [3, 4, 5]);
    expect(triangle.calculateArea()).toBeCloseTo(6, 2);
  });

  test("should calculate perimeter correctly", () => {
    const triangle = new Triangle("Triangle", "purple", [3, 4, 5]);
    expect(triangle.calculatePerimeter()).toBe(12);
  });

  test("should throw error if sides do not form a valid triangle", () => {
    expect(() => new Triangle("Triangle", "purple", [1, 2, 10])).toThrow(
      "The sides do not satisfy the triangle inequality."
    );
  });
});
