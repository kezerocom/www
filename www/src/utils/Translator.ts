import type { Language } from "./Language";
import { getSecret } from "astro:env/server";

export default class Translator {
    private readonly language: Language;
    private readonly debug: boolean;

    public constructor(language: Language, debug: boolean) {
        this.language = language;
        this.debug = debug;
    }

    public translate(value: any): string {
        return this.debug ? Translator.getDebugPrefix() + value : value;
    }

    public getLanguage(): Language {
        return this.language;
    }

    private static getDebugPrefix(): string {
        return "(ξ诶) ";
    }
}
