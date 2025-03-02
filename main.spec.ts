import { describe, test, expect } from '@jest/globals';
import { appTranslations, appOptionalTranslations } from './main';

describe("Translations object", () => {
  test("should return correct translation for existing keys", () => {
    expect(appTranslations["en"]).toBe("Hello");
    expect(appTranslations["ua"]).toBe("Привіт");
  });

  test("should return undefined for non-existing keys", () => {
    expect(appTranslations["pt"]).toBeUndefined();
    expect(appTranslations["de"]).toBeUndefined();
  });
});

describe("OptionalTranslations object", () => {
  test("should return correct translation for existing keys", () => {
    expect(appOptionalTranslations["en"]).toBe("Hi");
    expect(appOptionalTranslations["fr"]).toBe("Bonjour");
  });

  test("should return undefined for missing or explicitly undefined keys", () => {
    expect(appOptionalTranslations["ua"]).toBeUndefined();
    expect(appOptionalTranslations["pt"]).toBeUndefined();
  });
});
