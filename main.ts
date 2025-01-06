type Operator = "+" | "-" | "*" | "/" | "%";

interface ICalculate {
    chooseOperation(operator: Operator): number | string;
    add() : number;
    subtract() : number;
    multiply() : number;
    divide() : number;
    percent() : string;
}

class Calculate implements ICalculate {
    private _firstNumber: number;
    private _secondNumber: number;
    
    constructor(firstNumber: number, secondNumber: number) {
        this._firstNumber = firstNumber;
        this._secondNumber = secondNumber;
    }

    set firstNumber(value: number) {
        if (Number.isNaN(value)) {
            throw new Error("First number must be a valid number.");
          }
          this._firstNumber = value;
    }

    set secondNumber(value: number) {
        if (Number.isNaN(value)) {
            throw new Error("Second number must be a valid number.");
          }
          this._secondNumber = value;
    }

    get firstNumber(): number {
        return this._firstNumber;
    }

    get secondNumber(): number {
        return this._secondNumber;
    }

    chooseOperation(operator: Operator): number | string {
        switch (operator) {
            case "+":
              return this.add();
            case "-":
              return this.subtract();
            case "*":
              return this.multiply();
            case "/":
              return this.divide();
            case "%":
              return this.percent();
            default:
              throw new Error(`Unknown operator: ${operator}`);
        }
    }

    add() : number {
        return this.firstNumber + this.secondNumber;
    }

    subtract() : number {
        return this.firstNumber - this.secondNumber;
    }

    multiply() : number{
        return this.firstNumber * this.secondNumber;
    }

    divide() : number {
        if (this.secondNumber === 0) {
            throw new Error(`Division by zero is not allowed`);
          }
        return this.firstNumber / this.secondNumber;
    }

    percent() : string {
        return this.firstNumber * this.secondNumber / 100 + '%';
    }
}

const calc = new Calculate(10, 2);

console.log("Add:", calc.chooseOperation("+"));
console.log("Subtract:", calc.chooseOperation("-"));
console.log("Multiply:", calc.chooseOperation("*"));
console.log("Divide:", calc.chooseOperation("/"));
console.log("Percent:", calc.chooseOperation("%"));
console.log("Division by zero:", new Calculate(10, 0).chooseOperation("/"));