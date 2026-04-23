import {
    createURLSearchParams
} from "./shared-5XR54UIB.js";
var getUrl = async (zone, domain, passParamToParams) => {
    const domainWithProtocol = domain.includes("http") ? domain : `https://${domain}`;
    const url = new URL(`${domainWithProtocol}/${"afu.php" }`);
    const searchParams = await createURLSearchParams({
        zone: zone.toString(),
        passParamToParams
    });
    const urlWithParams = decodeURIComponent(`${url.toString()}?${searchParams.toString()}`);
    console.log("URL generated:", urlWithParams);
    return urlWithParams;
};
var checkConfig = () => {
    if (typeof APP_CONFIG === "undefined") {
        document.body.innerHTML = `
            <p style="">LANDING CAN'T BE RENDERED. \u{1F514} PLEASE ADD CODE(you can find an object with options in your Propush account) FROM PROPUSH TO HEAD TAG.</p>
        `;
        return false;
    }
    return true;
};
var isExitTab = (value) => value === "currentTab" || value === "newTab";
var isExitField = (value) => value === "zoneId" || value === "url";
var isFeatureSetting = (value) => value === "count" || value === "pageUrl" || value === "timeToRedirect";
var normalizeExitFieldValue = (field, value) => {
    if (field === "url") return typeof value === "string" ? value : void 0;
    if (typeof value === "string") return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
    return void 0;
};
var isValidFeatureValue = (setting, value) => {
    if (setting === "pageUrl") return typeof value === "string";
    return typeof value === "number";
};
var tryParseExitKey = ({
    key,
    value,
    domain,
    exits
}) => {
    var _a;
    const [exitName, tabOrType, type] = key.split("_");
    if (!exitName || !tabOrType) return false;
    const previousFeature = (_a = exits[exitName]) != null ? _a : {};
    if (isExitTab(tabOrType)) {
        if (!type || !isExitField(type)) return false;
        const normalized = normalizeExitFieldValue(type, value);
        if (normalized === void 0) return false;
        exits[exitName] = {
            ...previousFeature,
            [tabOrType]: {
                domain: type === "zoneId" ? domain : void 0,
                [type]: normalized
            }
        };
        return true;
    }
    if (isExitField(tabOrType)) {
        const normalized = normalizeExitFieldValue(tabOrType, value);
        if (normalized === void 0) return false;
        exits[exitName] = {
            ...previousFeature,
            currentTab: {
                domain: tabOrType === "zoneId" ? domain : void 0,
                [tabOrType]: normalized
            }
        };
        return true;
    }
    if (isFeatureSetting(tabOrType) && isValidFeatureValue(tabOrType, value)) {
        exits[exitName] = {
            ...previousFeature,
            [tabOrType]: value
        };
        return true;
    }
    return false;
};
var parseConfig = (rawAppConfig) => {
    const isConfigExist = checkConfig();
    if (!isConfigExist) return void 0;
    const exits = {};
    for (const [key, value] of Object.entries(rawAppConfig)) {
        tryParseExitKey({
            key,
            value,
            domain: rawAppConfig.domain,
            exits
        });
    }
    const parsedConfig = {
        ...rawAppConfig,
        ...exits
    };
    return parsedConfig;
};

export {
    getUrl,
    parseConfig
};