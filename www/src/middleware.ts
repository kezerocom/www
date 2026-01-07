import type { APIContext, MiddlewareNext } from "astro";
import Translator from "./utils/Translator";
import Globalization from "./utils/Globalization";
import type { Language } from "./utils/Language";

export function onRequest(context: APIContext, next: MiddlewareNext) {
    if (context.locals.isRewrited) {
        return next();
    }

    const culture = getCultureByContext(context.url.pathname);

    if (context.url.pathname.trim() == "/") {
        return context.redirect("/" + getDefaultCultyreByContext(context));
    }

    const language = Globalization.getLanguageByProperty(culture) as Language;

    if (!language || language.getCode().trim().toLowerCase() !== culture.trim().toLowerCase()) {
        return next();
    }

    context.locals.isRewrited = true;
    context.locals.language = language;
    context.locals.translator = new Translator(language, import.meta.env.DEV);
    context.locals.it = (input: string) => context.locals.translator.translate(input);
    context.locals.navigateTo = (link: string) => getNavigationTo(language, link);

    const pathname = getPathnameWithoutCulture(culture, context.url.pathname);

    return context.rewrite(pathname);
}

function getCultureByContext(pathname: string | undefined): string | undefined {
    if (!pathname) return undefined;

    const normalizedPathname = pathname.trim().toLowerCase();

    if (normalizedPathname == "/" || !normalizedPathname.startsWith("/")) return undefined;

    const segments = normalizedPathname.split("/").filter(Boolean);

    return segments.length > 0 ? segments[0] : undefined;
}

function getDefaultCultyreByContext(context: APIContext): string {
    const fallback: string = "en";

    return fallback;
}

function getPathnameWithoutCulture(culture: string, pathname: string): string {
    const normalizedPathname = pathname.trim();
    const normalizedCulture = "/" + culture.trim();

    if (normalizedPathname.length <= normalizedCulture.length) return "/";

    const newPathname = normalizedPathname.substring(normalizedCulture.length).trim();

    return newPathname.startsWith("/") ? newPathname : "/" + newPathname;
}

function getNavigationTo(language: Language, link: string): string {
    if (!link.startsWith("/") && link.includes(":")) {
        return link;
    }

    return `/${language.getCode()}` + (link.startsWith("/") ? link : `/${link}`);
}
