import {
    makeExit
} from "./shared-SX2B747D.js";
import {
    parseConfig
} from "./shared-4COQCWMM.js";
import "./shared-5XR54UIB.js";
import "./shared-IZBMCQM6.js";
var config = parseConfig(APP_CONFIG);
if (config) {
    document.addEventListener("click", () => {
        makeExit(config, "mainExit");
    });
}