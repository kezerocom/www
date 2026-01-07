export class Language {
    private readonly name: string;
    private readonly code: string;
    private readonly nativeName: string;

    public constructor(name: string, code: string, nativeName: string) {
        this.name = name;
        this.code = code;
        this.nativeName = nativeName;
    }

    public getName(normalized: boolean = false): string {
        if (normalized) return this.name.trim().toLowerCase();
        return this.name;
    }

    public getCode(normalized: boolean = false): string {
        if (normalized) return this.code.trim().toLowerCase();
        return this.code;
    }

    public getNativeName(normalized: boolean = false): string {
        if (normalized) return this.nativeName.trim().toLowerCase();
        return this.nativeName;
    }

    public equals(language: string | undefined): boolean {
        if (!language) return false;

        const normalizedLanguage = language.trim().toLowerCase();

        if (!normalizedLanguage) return false;

        return (
            normalizedLanguage === this.getCode(true) || normalizedLanguage === this.getName(true) || normalizedLanguage === this.getNativeName(true)
        );
    }
}
