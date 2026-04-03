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
var translateElements = async (loadFallbackTranslation2, macroses, localePath) => {
    const lang = getCurrentLanguage();
    document.documentElement.setAttribute("lang", lang);
    const translations = await getTranslations(loadFallbackTranslation2, localePath);
    if (["ar", "he", "fa", "ur", "az", "ku", "ff", "dv"].includes(lang)) {
        const isFallback = isFallbackTranslation(localePath);
        if (!isFallback) {
            document.documentElement.setAttribute("dir", "rtl");
        }
    }
    const nonTranslatedKeys = [];
    Object.entries(translations).forEach((translation) => {
        var _a;
        const key = translation[0];
        let value = translation[1];
        const macros = macroses == null ? void 0 : macroses[key];
        if (macros) {
            const macrosFallbackValue = macros.fallbackTranslationKey ? translations[macros.fallbackTranslationKey] : void 0;
            const macrosValue = (_a = macros.macrosValue) != null ? _a : macrosFallbackValue;
            value = macrosValue ? value.replaceAll(macros.macros, macrosValue) : value;
        }
        const elementToTranslate = document.querySelectorAll(
            `[data-translate="${key}"]`
        );
        if (elementToTranslate == null ? void 0 : elementToTranslate.length) {
            elementToTranslate.forEach((element) => {
                if (element) {
                    const useHTML = element.hasAttribute("data-translate-html");
                    if (useHTML) {
                        element.innerHTML = value;
                    } else {
                        if (!element.childNodes.length) element.textContent = value;
                        element.childNodes.forEach((node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                node.nodeValue = value;
                            }
                        });
                    }
                }
            });
            return;
        }
        nonTranslatedKeys.push(key);
    });
    if (nonTranslatedKeys.length) {
        console.warn(
            `Some keys from locales folder weren't used for translation when loading the landing page for the first time:`,
            nonTranslatedKeys.join(", ")
        );
    }
};
var loadFallbackTranslation = async () => {
    return await import("./shared-5MQPAARO.js").then(
        (m) => m.default
    );
};
var initTranslation = async () => {
    translateElements(loadFallbackTranslation);
};
initTranslation();