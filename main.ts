interface IBankAccount {
  readonly accountNumber: string;
  readonly balance: number;
  owner: Client;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

type TransactionType = "deposit" | "withdraw";

export class Client {
  private readonly firstName: string;
  private readonly lastName: string;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Transaction {
  public readonly amount: number;
  public readonly date = Date.now();
  public readonly id: number;
  public readonly type: TransactionType;

  constructor(type: TransactionType, amount: number, id: number) {
    this.amount = amount;
    this.id = id;
    this.type = type;
  }
}

export class TransactionHistory {
  private readonly _transactions: Transaction[] = [];

  public get transactions(): ReadonlyArray<Transaction> {
    return this._transactions;
  }

  public addTransaction(type: TransactionType, amount: number): void {
    this._transactions.push(new Transaction(type, amount, 42));
  }
}

class Bank {
  private static instance: Bank;
  private accounts = new Map<string, BankAccount>();

  private constructor() {}

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public createAccount(owner: Client, balance: number, currency: string): BankAccount {
    const account = new BankAccount(owner, balance, currency);
    this.accounts.set(account.accountNumber, account);
    return account;
  }

  public closeAccount(accountNumber: string): void {
    this.accounts.delete(accountNumber);
  }
}

export class BankAccount implements IBankAccount {
  private _balance: number;
  private _owner: Client;
  public readonly currency: string;
  public readonly accountNumber = this.generateAccountNumber();

  constructor(owner: Client, balance: number, currency: string) {
    this._balance = balance;
    this._owner = owner;
    this.currency = currency;
  }

  public get balance(): number {
    return this._balance;
  }

  public get owner(): Client {
    return this._owner;
  }

  public set owner(value: Client) {
    this._owner = value;
  }

  public deposit(amount: number): void {
    this._balance += amount;
    console.info(`Deposit: ${amount} ${this.currency}. New Balance: ${this.balance} ${this.currency}`);
  }

  public withdraw(amount: number): void {
    if (amount > this._balance) {
      console.warn("Insufficient funds!");
      return;
    }
    this._balance -= amount;
    console.info(`Withdraw: ${amount} ${this.currency}. New Balance: ${this.balance} ${this.currency}`);
  }

  private generateAccountNumber(): string {
    return `ACC-${Math.floor(Math.random() * 100000)}`;
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

export class DepositCommand implements Command {
  constructor(private account: BankAccount, private amount: number) {}
  execute(): void {
    this.account.deposit(this.amount);
  }
  undo(): void {
    this.account.withdraw(this.amount);
  }
}

export class WithdrawCommand implements Command {
  constructor(private account: BankAccount, private amount: number) {}
  execute(): void {
    this.account.withdraw(this.amount);
  }
  undo(): void {
    this.account.deposit(this.amount);
  }
}

export class TransactionQueue {
  private queue: Command[] = [];
  private history: Command[] = [];

  public addTransaction(command: Command): void {
    this.queue.push(command);
  }

  public processTransactions(): void {
    while (this.queue.length) {
      const command = this.queue.shift();
      command?.execute();
      this.history.push(command!);
    }
  }

  public undoLastTransaction(): void {
    const command = this.history.pop();
    command?.undo();
  }
}
