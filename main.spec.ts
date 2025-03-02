import { describe, test, expect } from '@jest/globals';

import { handleAction, Action } from "./main";

describe("handleAction function", () => {
  test("should handle CREATE_USER action", () => {
    const action: Action = {
      type: "CREATE_USER",
      payload: { name: "Олексій", age: 25 },
    };
    expect(handleAction(action)).toBe(
      "Створено нового користувача: ім'я - Олексій, вік - 25"
    );
  });

  test("should handle DELETE_USER action", () => {
    const action: Action = {
      type: "DELETE_USER",
      payload: { userId: 1 },
    };
    expect(handleAction(action)).toBe("Користувача з ID 1 видалено.");
  });

  test("should handle UPDATE_USER action with name only", () => {
    const action: Action = {
      type: "UPDATE_USER",
      payload: { userId: 2, name: "Марія" },
    };
    expect(handleAction(action)).toBe(
      "Оновлюємо дані користувача з ID 2:\n- нове ім'я: Марія"
    );
  });

  test("should handle UPDATE_USER action with age only", () => {
    const action: Action = {
      type: "UPDATE_USER",
      payload: { userId: 2, age: 30 },
    };
    expect(handleAction(action)).toBe(
      "Оновлюємо дані користувача з ID 2:\n- новий вік: 30"
    );
  });

  test("should handle UPDATE_USER action with name and age", () => {
    const action: Action = {
      type: "UPDATE_USER",
      payload: { userId: 2, name: "Марія", age: 30 },
    };
    expect(handleAction(action)).toBe(
      "Оновлюємо дані користувача з ID 2:\n- нове ім'я: Марія\n- новий вік: 30"
    );
  });

  test("should handle BLOCK_USER action", () => {
    const action: Action = {
      type: "BLOCK_USER",
      payload: { userId: 3, reason: "Порушення правил" },
    };
    expect(handleAction(action)).toBe(
      "Користувача з ID 3 заблоковано. Причина: Порушення правил"
    );
  });

  test("should throw an error for unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION", payload: {} } as Action;
    expect(() => handleAction(action)).toThrow("Необроблений тип дії: UNKNOWN_ACTION");
  });
});
