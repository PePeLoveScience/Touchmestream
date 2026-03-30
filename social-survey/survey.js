// This file (survey.js) is responsible for generating the survey.
// Based on this data, JavaScript code dynamically renders the survey on the landing page.
// Each object in the array represents a single question in the survey.
// All text-related values must be keys from the translation files in the "locales" folder (not plain text).
var SURVEY_JS = [
  {
    // Key for the label displayed above the question (taken from translation files in "locales").
    "title": "attention",
    // Key for the question text itself (from "locales" translations).
    "question": "are_you_over_18",
    // An array of answer options. Each object represents an answer button.
    "answers": [
      {
        // Key for the answer button text (from "locales" translations).
        "text": "no",
        // The "exit" value determines what happens when the button is clicked.
        // This should match a key in the APP_CONFIG variable defined in index.html.
        // Use "nextStep" to proceed to the next question.
        "exit": "ageExit"
      },
      {
        "text": "yes",
        "exit": "tabUnderClick"
      }
    ]
  },
  {
    "title": "question",
    "question": "what_is_your_gender",
    "answers": [
      {
        "text": "female",
        "exit": "nextStep"
      },
      {
        "text": "male",
        "exit": "nextStep"
      }
    ]
  },
  {
    "title": "question",
    "question": "are_you_looking_for_relationship",
    "answers": [
      {
        "text": "yes",
        "exit": "nextStep"
      },
      {
        "text": "no",
        "exit": "nextStep"
      }
    ]
  },
  {
    "title": "congratulations",
    // Final screen message. The value is a key from the "locales" translations.
    "question": "your_partner_waiting_you",
    "answers": [
      {
        // Button that completes the survey and triggers the final action (e.g., redirect).
        "text": "start",
        // The final action type. Should match a key from APP_CONFIG.
        "exit": "mainExit"
      }
    ]
  }
]
