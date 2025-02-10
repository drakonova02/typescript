// Task 1

function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
function sortArray<T, K extends keyof T>(arr: T[], key: K): T[];
function sortArray<T, K extends keyof T>(
  arr: T[], 
  param: ((a: T, b: T) => number) | K
): T[] {
  if (typeof param === "function") {
    return [...arr].sort(param);
  } else {
    return [...arr].sort((a, b) => {
      if (a[param] < b[param]) return -1;
      if (a[param] > b[param]) return 1;
      return 0;
    });
  }
}

const numbers = [5, 3, 8, 1];
console.log(sortArray(numbers, (a, b) => a - b));

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
];
console.log(sortArray(users, "age"));


// Task 2

type DeepReadonly<T> = {
  +readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
}


// Task 3

type DeepRequireReadonly<T> = {
  +readonly [P in keyof T]-?: T[P] extends object ? DeepRequireReadonly<T[P]> : T[P];
}


// Task 4

type PartialByKeys<T, K extends keyof T> = {
  [P in keyof T]: T[P];
} & { [P in K]?: T[P] };

// Task 5

type ReadonlyByKeys<T, K extends keyof T> = {
  [P in keyof T]: T[P];
} & { +readonly [P in K]: T[P] };

// Task 6

type MutableByKeys<T, K extends keyof T> = {
  [P in keyof T]: T[P];
} & { -readonly [P in K]: T[P] };


// Task 7

type UpperCaseKeys<T> = {
  [P in keyof T as Uppercase<string & P>]: T[P];
}

// Task 8

type CustomPropertyDescriptor<T> = {
  value: T;
  writable: boolean;
  enumerable: boolean;
  configurable: boolean;
};

type ObjectToPropertyDescriptor<T> = {
  [P in keyof T]: CustomPropertyDescriptor<T[P]>;
};