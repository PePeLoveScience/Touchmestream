import {
    getCurrentLanguage
} from "./shared-IZBMCQM6.js";
var translationsCache = {};
var isFallbackCache = {};
var localePathCache;
var getTranslations = async (loadFallbackTranslation2, localePath) => {
    const lang = getCurrentLanguage();
    if (!translationsCache[lang] || localePathCache !== localePath) {
        localePathCache = localePath;
        translationsCache[lang] = (async () => {
            try {
                const localeUrl = localePath ? `${localePath}/${lang}.json` : `./locales/${lang}.json`;
                const response = await fetch(localeUrl);
                if (response.ok && response.status === 200) {
                    isFallbackCache[lang] = false;
                    return await response.json();
                }
                throw new Error(`Locale file not found: ${localeUrl}`);
            } catch (error) {
                if (error instanceof Error && window.syncMetric) {
                    window.syncMetric({
                        event: "error",
                        errorMessage: error.message,
                        errorType: "CUSTOM",
                        errorSubType: "GetTranslations"
                    });
                    console.error(
                        `Error while loading translations: ${error.message}. Check the content of ${localePath ? `${localePath}/${lang}.json` : `./locales/${lang}.json`} file`
                    );
                }
                isFallbackCache[lang] = true;
                return await loadFallbackTranslation2();
            }
        })();
    }
    return translationsCache[lang];
};
var isFallbackTranslation = (localePath) => {
    var _a;
    const lang = getCurrentLanguage();
    if (localePathCache !== localePath) {
        return false;
    }
    return (_a = isFallbackCache[lang]) != null ? _a : false;
};
var loadFallbackTranslation = async () => {
    return await import("./shared-VHYXM7GT.js").then((m) => m.default);
};

export {
    getTranslations,
    isFallbackTranslation,
    loadFallbackTranslation
};