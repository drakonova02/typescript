import { describe, test, expect, beforeEach } from '@jest/globals';
import { Calculate } from './main'; // Путь к вашему классу

describe('Calculate class', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculate();
  });

  test('should add two numbers correctly', () => {
    expect(calc.calc('+', 10, -5)).toBe(5);
  });

  test('should subtract two numbers correctly', () => {
    expect(calc.calc('-', 10, -5)).toBe(15);
  });

  test('should multiply two numbers correctly', () => {
    expect(calc.calc('*', 10, -5)).toBe(-50);
  });

  test('should divide two numbers correctly', () => {
    expect(calc.calc('/', 10, -5)).toBe(-2);
  });

  test('should throw an error when dividing by zero', () => {
    expect(() => calc.calc('/', 10, 0)).toThrow('Division by zero is not allowed');
  });

  test('should calculate percentage correctly', () => {
    expect(calc.calc('%', 10, -5)).toBe('0.5%');
  });

  test('should return an error for unknown operator', () => {
    expect(() => calc.calc('^', 10, 5)).toThrow('Unknown operator: ^');
  });
});
