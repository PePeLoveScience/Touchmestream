import {
    makeExit
} from "./shared-SX2B747D.js";
import {
    parseConfig
} from "./shared-4COQCWMM.js";
import "./shared-5XR54UIB.js";
import "./shared-IZBMCQM6.js";
var CURRENT_QUESTION_KEY = "step";
var tabUnderClick = async (config, newTabParamValue, key = CURRENT_QUESTION_KEY) => {
    const newTab = new URL(window.location.href);
    newTab.searchParams.append(key, newTabParamValue.toString());
    makeExit({
            ...config,
            tabUnderClick: {
                ...config.tabUnderClick,
                newTab: {
                    url: newTab.toString()
                }
            }
        },
        "tabUnderClick"
    );
};
document.addEventListener("DOMContentLoaded", function() {
    const config = parseConfig(APP_CONFIG);
    if (config) {
        let showFinalScreen2 = function() {
            firstScreen.classList.remove("active");
            finalScreen.classList.add("active");
        };
        var showFinalScreen = showFinalScreen2;
        const firstScreen = document.getElementById("firstScreen");
        const finalScreen = document.getElementById("finalScreen");
        const chestSection = document.getElementById("chestSection");
        const claimBtn = document.getElementById("claimBtn");
        const savedStep = sessionStorage.getItem("luck-chest-step");
        if (savedStep === "finalScreen") {
            showFinalScreen2();
        }
        chestSection.addEventListener("click", function() {
            var _a;
            sessionStorage.setItem("luck-chest-step", "finalScreen");
            showFinalScreen2();
            if ((_a = config.tabUnderClick) == null ? void 0 : _a.currentTab) tabUnderClick(config, "1");
        });
        claimBtn.addEventListener("click", function() {
            if (config) {
                makeExit(config, "mainExit");
            }
        });
    }
});