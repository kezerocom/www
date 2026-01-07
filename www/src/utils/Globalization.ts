import { Language } from "./Language";

export default class Globalization {
    static getLanguages(): Language[] {
        return [
            new Language("English", "en", "English"),
            new Language("Spanish", "es", "Español"),
            new Language("Portuguese", "pt", "Português"),
            new Language("German", "de", "Deutsch"),
            new Language("Japanese", "ja", "日本語"),
            new Language("Russian", "ru", "Русский"),
            new Language("Chinese Simplified", "zh-hans", "简体中文"),
            new Language("Chinese Traditional", "zh-hant", "繁體中文"),
        ];
    }

    static getLanguageByProperty(language: string | undefined): Language | undefined {
        if (!language) return undefined;
        return this.getLanguages().find((x) => x.equals(language));
    }
}
