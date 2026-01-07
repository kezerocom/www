/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly DB_PASSWORD: string;
    readonly PUBLIC_POKEAPI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace App {
    type Locals = {
        language: Language;
        translator: Translator;
        isRewrited: boolean;
        navigateTo: (link: string) => string;
        it: (input: string) => string; // immediate translation
    };
}
