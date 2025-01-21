type Translations = {
  [codeLanguage: string]: string | undefined;
}

type OptionalTranslations = {
  en?: string;
  ua?: string;
  [codeLanguage: string]: string | undefined;
};

let appTranslations : Translations = {
  en: "Hello",
  ua: "Привіт",
}

const appOptionalTranslations: OptionalTranslations = {
  en: "Hi",
  ua: undefined, // Необов'язкове, можна не вказувати
  fr: "Bonjour",
};


console.log(appTranslations['en']);
console.log(appTranslations['pt']);