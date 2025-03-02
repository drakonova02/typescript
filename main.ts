type Translations = {
  [codeLanguage: string]: string | undefined;
}

type OptionalTranslations = {
  en?: string;
  ua?: string;
  [codeLanguage: string]: string | undefined;
};

export let appTranslations : Translations = {
  en: "Hello",
  ua: "Привіт",
}

export const appOptionalTranslations: OptionalTranslations = {
  en: "Hi",
  ua: undefined, // Необов'язкове, можна не вказувати
  fr: "Bonjour",
};


console.log(appTranslations['en']);
console.log(appTranslations['pt']);