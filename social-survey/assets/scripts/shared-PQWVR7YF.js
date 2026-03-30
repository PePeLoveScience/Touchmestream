import {
    getCurrentLanguage
} from "./shared-IZBMCQM6.js";
var translationsCache = {};
var isFallbackCache = {};
var localePathCache;
var getTranslations = async (loadFallbackTranslation, localePath) => {
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
                return await loadFallbackTranslation();
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

export {
    getTranslations,
    isFallbackTranslation
};