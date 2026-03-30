import {
    makeExit
} from "./shared-P2B7W3OB.js";
import {
    parseConfig
} from "./shared-FCZ3XQZK.js";
import "./shared-5XR54UIB.js";
import {
    getTranslations
} from "./shared-PQWVR7YF.js";
import "./shared-IZBMCQM6.js";
var CURRENT_QUESTION_KEY = "step";

function removeUrlParameter(paramKey) {
    const url = window.location.href;
    const r = new URL(url);
    r.searchParams.delete(paramKey);
    const newUrl = r.href;
    window.history.replaceState(window.history.state, "", newUrl);
}
var getCurrentStepFromURL = (key = CURRENT_QUESTION_KEY, shouldDeleteKey = true) => {
    const url = new URL(window.location.href);
    const step = url.searchParams.get(key);
    if (shouldDeleteKey) removeUrlParameter(key);
    return step;
};
var getTranslation = (translations, key, defaultValue = "No data") => {
    if (!key || !translations[key]) {
        console.warn(!key ? "Key is not found" : `Key "${key}" is not found in translation files.`);
        return defaultValue;
    }
    return translations[key];
};
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
var handleSurveyStep = ({
    actionType,
    config,
    onNextStep,
    onProgressStart,
    nextStepNumber,
    customActions
}) => {
    if (!config || !actionType) return;
    const DEFAULT_ACTIONS = {
        nextStep: onNextStep,
        progress: onProgressStart,
        tabUnderClick: () => {
            onNextStep == null ? void 0 : onNextStep();
            tabUnderClick(config, nextStepNumber);
        },
        ...customActions
    };
    let handler = actionType in DEFAULT_ACTIONS ? DEFAULT_ACTIONS[actionType] : void 0;
    if (!handler) {
        handler = () => {
            var _a;
            onNextStep == null ? void 0 : onNextStep();
            (_a = makeExit) == null ? void 0 : _a(config, actionType);
        };
    }
    handler();
};
var readSurveyConfig = async () => {
    try {
        const surveyConfig = SURVEY_JS;
        if (!(surveyConfig == null ? void 0 : surveyConfig.length)) {
            document.body.innerHTML = `
              <p style="width:100vw;height:100vh;display:flex;justify-content:center;align-items: center;">LANDING CAN'T BE RENDERED. \u{1F514} PLEASE CREATE AND FILL survey.js FILE IN ROOT FOLDER</p>
          `;
            return void 0;
        }
        return surveyConfig;
    } catch (error) {
        if (error instanceof Error && window.syncMetric) {
            window.syncMetric({
                event: "error",
                errorMessage: error.message,
                errorType: "CUSTOM",
                errorSubType: "ReadSurveyConfig"
            });
            console.error(`${error.message} Check the content of survey.js file`);
        }
    }
};
var loadFallbackTranslation = async () => {
    return await import("./shared-HDCZ7IOL.js").then((m) => m.default);
};
var HEART_ANIMATE_DELAY = 25;
var HEART_INIT_DELAY = 5;
var HEART_MAX_COUNT = 3;
var SPEED = 1;
var STEP_CHANGE_DELAY = 500;

function animateHeart(elHeart, index) {
    const x = +elHeart.style.left.substring(0, elHeart.style.left.length - 2);
    let y = +elHeart.style.top.substring(0, elHeart.style.top.length - 2);
    const direction = 1 - Math.round(Math.random()) * 2;
    const bound = 30 + Math.random() * 20;
    const scale = Math.random() * Math.random() * 0.8 + 0.2;
    let counter = 0;
    const id = setInterval(() => {
        counter += 1;
        elHeart.style.top = `${y}px`;
        elHeart.style.left = `${x}${direction * bound * Math.sin(y * scale / 30) / y * 100}px`;
        if (counter >= HEART_MAX_COUNT * HEART_MAX_COUNT) {
            clearInterval(id);
        }
        y -= SPEED + index * 3;
    }, HEART_ANIMATE_DELAY);
}

function generateHeart(scale) {
    const elHeart = document.createElement("div");
    elHeart.setAttribute("class", "heart");
    elHeart.style.left = "100%";
    elHeart.style.top = "100%";
    elHeart.style.transform = `scale(${scale})`;
    return elHeart;
}

function initHeart(event) {
    let counter = 0;
    const id = setInterval(() => {
        const scale = Math.random() * Math.random() * 0.8 + 0.2;
        const elHeart = generateHeart(scale);
        counter += 1;
        if (event.target instanceof Element) {
            event.target.appendChild(elHeart);
        }
        animateHeart(elHeart, counter);
        if (counter >= HEART_MAX_COUNT) {
            clearInterval(id);
        }
    }, HEART_INIT_DELAY);
}
var generateSurvey = async () => {
    const survey = await readSurveyConfig();
    const config = parseConfig(APP_CONFIG);
    if (!config) return;
    console.log(config);
    if (!survey || !config) return;
    const surveyStepNodes = [];
    const surveyContainer = document.querySelector(".survey-container");
    const elProgressBar = document.querySelector(".progress .bar");
    const stepFromUrl = getCurrentStepFromURL();
    const getCurrentStep = () => {
        return survey.length - surveyStepNodes.length;
    };
    const nextStep = () => {
        if (surveyStepNodes.length) {
            const stepCurrent = survey.length - surveyStepNodes.length;
            elProgressBar.style.width = `${stepCurrent * 100 / (survey.length - 1)}%`;
            let currentElement = surveyStepNodes.shift();
            if (stepFromUrl) {
                const targetStep = Number(stepFromUrl);
                if (targetStep > stepCurrent) {
                    for (let i = 0; i < targetStep - stepCurrent - 1; i++) {
                        currentElement = surveyStepNodes.shift();
                    }
                }
            }
            surveyContainer.innerHTML = "";
            surveyContainer.append(currentElement);
        }
    };
    const onNextStep = (evt) => {
        console.log("Next step worked");
        initHeart(evt);
        setTimeout(() => {
            nextStep();
        }, STEP_CHANGE_DELAY);
    };
    if (survey && survey.length) {
        const templateNode = document.querySelector("#step");
        const translations = await getTranslations(loadFallbackTranslation);
        survey.forEach((question) => {
            var _a;
            const clone = document.importNode(templateNode.content, true);
            const titleNode = clone.querySelector(".step__title");
            const questionNode = clone.querySelector(".step__question");
            const answersContainerNode = clone.querySelector(".step__answers");
            if (!question.title) console.error("No question title in some option of survey.js");
            if (!question.question) console.error("No question in some option of survey.js");
            titleNode.textContent = getTranslation(translations, question.title);
            questionNode.textContent = getTranslation(translations, question.question);
            if (!((_a = question.answers) == null ? void 0 : _a.length)) return console.error("No answers in some option of survey.js");
            question.answers.forEach((answer, i) => {
                var _a2;
                let answerNode = document.querySelector("#step-answer-left");
                if (((_a2 = question.answers) == null ? void 0 : _a2.length) === 1) {
                    answerNode = document.querySelector("#step-answer-single");
                } else if (i % 2 !== 0) {
                    answerNode = document.querySelector("#step-answer-right");
                }
                if (!answer.text) console.error("Some question answer missed text field in survey.js");
                const answerCloneNode = document.importNode(answerNode.content, true);
                const link = answerCloneNode.querySelector("a");
                link.textContent = getTranslation(translations, answer.text);
                answersContainerNode.append(answerCloneNode);
                const {
                    exit: actionType
                } = answer;
                link.addEventListener("click", (evt) => {
                    evt.preventDefault();
                    handleSurveyStep({
                        config,
                        actionType,
                        nextStepNumber: getCurrentStep() + 1,
                        onNextStep: () => onNextStep(evt)
                    });
                });
            });
            surveyStepNodes.push(clone);
        });
        nextStep();
    }
};
generateSurvey();