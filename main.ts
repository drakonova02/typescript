function fetchData(): unknown {

  return { name: "John Doe", age: 30 };
}

type Person = { name: string; age: number };

function assertIsPerson(value: unknown): asserts value is Person {
  if (
    typeof value !== "object" ||
    value === null ||
    typeof (value as any)?.name !== "string" ||
    typeof (value as any)?.age !== "number"
  ) {
    throw new Error("Value is not of type Person");
  }
}

function printPersonInfo(person: Person): void {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

const data = fetchData();

assertIsPerson(data);

printPersonInfo(data);
