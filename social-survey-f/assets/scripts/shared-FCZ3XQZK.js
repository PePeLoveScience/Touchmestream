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
var tabs = ["currentTab", "newTab"];
var exitTypes = ["zoneId", "url"];
var parseConfig = (rawAppConfig) => {
    const isConfigExist = checkConfig();
    if (!isConfigExist) return void 0;
    const {
        domain,
        videoCount,
        prizeName,
        prizeImg,
        ...exits
    } = rawAppConfig;
    const parsedExits = Object.entries(exits).reduce(
        (acc, [key, value]) => {
            const [exitName, tabOrType, type] = key.split("_");
            if (exitName) {
                if (tabs.includes(tabOrType)) {
                    const tab = tabOrType;
                    if (exitTypes.includes(type)) {
                        acc[exitName] = {
                            ...acc[exitName],
                            [tab]: {
                                domain: type === "zoneId" ? domain : void 0,
                                [type]: value
                            }
                        };
                    }
                } else if (exitTypes.includes(tabOrType)) {
                    const type2 = tabOrType;
                    acc[exitName] = {
                        ...acc[exitName],
                        currentTab: {
                            domain: type2 === "zoneId" ? domain : void 0,
                            [type2]: value
                        }
                    };
                } else {
                    const someSetting = tabOrType;
                    acc[exitName] = {
                        ...acc[exitName],
                        [someSetting]: value
                    };
                }
            }
            return acc;
        }, {}
    );
    return {
        videoCount,
        prizeName,
        prizeImg,
        ...parsedExits
    };
};

export {
    getUrl,
    parseConfig
};