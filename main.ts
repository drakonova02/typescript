// Task 1

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
}

// Task 2

type PickByValueType<T, ValueType> = {
  [P in keyof T as T[P] extends ValueType ? P : never]: T[P];
}

// Task 3

type OmitByValueType<T, ValueType> = {
  [P in keyof T as T[P] extends ValueType ? never : P]: T[P];
}

// Task 4

type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;


// Task 5

type ExtendedCustomReturnType<T extends (...args: any) => any> = 
  T extends (...args: infer A) => infer R ? [R, A] : never;
