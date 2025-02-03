// Task 1

type Result<T> = { status: "success"; data: T } | { status: "error"; error: string };

function handleResult<T>(result: Result<T>): T {
    if (result.status === "success") {
      return result.data;
    } else {
      throw new Error(result.error);
    }
}


// Task 2

class Queue <T> {
  private items: Array<T> = [];

  constructor(){};

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T {
    if (this.size()) {
      return this.items[0];
    }

    throw new Error("Length in Queue is 0");
  }

  size(): number {
    return this.items.length;
  }
}

// Task 3

function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...arr].sort(compareFn);
}


// Task 4

function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


// Task 5

interface Identifiable<T> {
  id: T;
}

class Repository<T extends Identifiable<K>, K> {
  private items: Array<T> = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: K): T | undefined {
    return this.items.find((item) => {return item.id === id});
  }

  removeById(id: K): boolean {
    const index: number = this.items.findIndex(item => item.id === id);
    
    if(index !== -1) {
      this.items.splice(index, 1);

      return true;
    }

    return false;
  }

  getAll(): Array<T> {
    return [...this.items];
  }
}

class User implements Identifiable<number> {
  constructor(public id: number, public name: string, public age: number) {}
}

class Product implements Identifiable<string> {
  constructor(public id: string, public name: string, public price: number) {}
}

const userRepository = new Repository<User, number>();
userRepository.add(new User(1, "Alice", 25));
userRepository.add(new User(2, "Bob", 30));

console.log("Користувачі:", userRepository.getAll());
console.log("Отримати користувача з id 1:", userRepository.getById(1));

console.log("Видалити користувача з id 1:", userRepository.removeById(1));
console.log("Користувачі після видалення:", userRepository.getAll());


const productRepository = new Repository<Product, string>();
productRepository.add(new Product("p1", "Laptop", 1200));
productRepository.add(new Product("p2", "Phone", 800));

console.log("Продукти:", productRepository.getAll());
console.log("Отримати продукт з id 'p2':", productRepository.getById("p2"));

console.log("Видалити продукт з id 'p2':", productRepository.removeById("p2"));
console.log("Продукти після видалення:", productRepository.getAll());