import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { BankAccount, Client, TransactionHistory, DepositCommand, WithdrawCommand, TransactionQueue } from './main';

describe('BankAccount', () => {
  let client;
  let account;

  beforeEach(() => {
    client = new Client('John', 'Doe');
    account = new BankAccount(client, 100, 'USD');
  });

  test('should create an account with initial balance', () => {
    expect(account.balance).toBe(100);
    expect(account.currency).toBe('USD');
    expect(account.owner.fullName).toBe('John Doe');
  });

  test('should deposit money correctly', () => {
    account.deposit(50);
    expect(account.balance).toBe(150);
  });

  test('should withdraw money correctly', () => {
    account.withdraw(50);
    expect(account.balance).toBe(50);
  });

  test('should not allow withdrawal if insufficient funds', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    account.withdraw(200);
    expect(account.balance).toBe(100);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Insufficient funds!');
    consoleWarnSpy.mockRestore();
  });
});

describe('TransactionHistory', () => {
  let history;

  beforeEach(() => {
    history = new TransactionHistory();
  });

  test('should add transactions', () => {
    history.addTransaction('deposit', 100);
    expect(history.transactions.length).toBe(1);
    expect(history.transactions[0].amount).toBe(100);
    expect(history.transactions[0].type).toBe('deposit');
  });
});

describe('Command Pattern', () => {
  let account;
  let depositCommand;
  let withdrawCommand;

  beforeEach(() => {
    const client = new Client('Alice', 'Smith');
    account = new BankAccount(client, 200, 'USD');
    depositCommand = new DepositCommand(account, 50);
    withdrawCommand = new WithdrawCommand(account, 50);
  });

  test('should execute deposit command', () => {
    depositCommand.execute();
    expect(account.balance).toBe(250);
  });

  test('should undo deposit command', () => {
    depositCommand.execute();
    depositCommand.undo();
    expect(account.balance).toBe(200);
  });

  test('should execute withdraw command', () => {
    withdrawCommand.execute();
    expect(account.balance).toBe(150);
  });

  test('should undo withdraw command', () => {
    withdrawCommand.execute();
    withdrawCommand.undo();
    expect(account.balance).toBe(200);
  });
});

describe('TransactionQueue', () => {
  let queue;
  let account;
  let deposit;
  let withdraw;

  beforeEach(() => {
    const client = new Client('Bob', 'Brown');
    account = new BankAccount(client, 500, 'USD');
    queue = new TransactionQueue();
    deposit = new DepositCommand(account, 100);
    withdraw = new WithdrawCommand(account, 50);
  });

  test('should process transactions in queue', () => {
    queue.addTransaction(deposit);
    queue.addTransaction(withdraw);
    queue.processTransactions();
    expect(account.balance).toBe(550);
  });

  test('should undo last transaction', () => {
    queue.addTransaction(deposit);
    queue.addTransaction(withdraw);
    queue.processTransactions();
    queue.undoLastTransaction();
    expect(account.balance).toBe(600);
  });
});