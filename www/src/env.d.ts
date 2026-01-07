/// <reference path="../.astro/types.d.ts" />

declare namespace App {
    type Locals = {
        language: Language;
        translator: Translator;
        isRewrited: boolean;
        navigateTo: (link: string) => string;
        it: (input: string) => { html: string } & string; // immediate translation
    };
}
