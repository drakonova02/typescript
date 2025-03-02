type Operator = "+" | "-" | "*" | "/" | "%";

interface ICalculate {
    calc(operator: Operator, firstNumber: number, secondNumber: number): number | string;
    add(firstNumber: number, secondNumber: number) : number;
    subtract(firstNumber: number, secondNumber: number) : number;
    multiply(firstNumber: number, secondNumber: number) : number;
    divide(firstNumber: number, secondNumber: number) : number;
    percent(firstNumber: number, secondNumber: number) : string;
}

export class Calculate implements ICalculate {
    constructor() {}

    calc(operator: Operator, firstNumber: number, secondNumber: number): number | string {
        switch (operator) {
            case "+":
              return this.add(firstNumber, secondNumber);
            case "-":
              return this.subtract(firstNumber, secondNumber);
            case "*":
              return this.multiply(firstNumber, secondNumber);
            case "/":
              return this.divide(firstNumber, secondNumber);
            case "%":
              return this.percent(firstNumber, secondNumber);
            default:
              throw new Error(`Unknown operator: ${operator}`);
        }
    }

    add(firstNumber: number, secondNumber: number) : number {
        return firstNumber + secondNumber;
    }

    subtract(firstNumber: number, secondNumber: number) : number {
        return firstNumber - secondNumber;
    }

    multiply(firstNumber: number, secondNumber: number) : number{
        return firstNumber * secondNumber;
    }

    divide(firstNumber: number, secondNumber: number) : number {
        if (secondNumber === 0) {
            throw new Error(`Division by zero is not allowed`);
          }
        return firstNumber / secondNumber;
    }

    percent(firstNumber: number, secondNumber: number) : string {
        let result : number = firstNumber * secondNumber / 100;
        return Math.abs(result) + '%';
    }
}

const calc = new Calculate();

console.log("Add:", calc.calc("+", 10, -5));
console.log("Subtract:", calc.calc("-", 10, -5));
console.log("Multiply:", calc.calc("*", 10, -5));
console.log("Divide:", calc.calc("/", 10, -5));
console.log("Percent:", calc.calc("%", 10, -5));