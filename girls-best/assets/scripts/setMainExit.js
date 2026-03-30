import {
    makeExit
} from "./shared-P2B7W3OB.js";
import {
    parseConfig
} from "./shared-FCZ3XQZK.js";
import "./shared-5XR54UIB.js";
import "./shared-IZBMCQM6.js";
var config = parseConfig(APP_CONFIG);
if (config) {
    document.addEventListener("click", () => {
        makeExit(config, "mainExit");
    });
}