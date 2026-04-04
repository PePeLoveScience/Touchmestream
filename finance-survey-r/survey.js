// This file (survey.js) is responsible for generating the survey.
// Based on this data, JavaScript code dynamically renders the survey on the landing page.
// Each object in the array represents a single question in the survey.
// All text-related values must be keys from the translation files in the "locales" folder (not plain text).
var SURVEY_JS = [
  {
    // Key for the question text itself (from "locales" translations).
    "question": "are_you_over_21",
    // An array of answer options. Each object represents an answer button.
    "answers": [
      {
        // Key for the answer button text (from "locales" translations).
        "text": "yes",
        // The "exit" value determines what happens when the button is clicked.
        // This should match a key in the APP_CONFIG variable defined in index.html.
        // Use "nextStep" to proceed to the next question.
        "exit": "tabUnderClick"
      },
      {
        "text": "no",
        "exit": "ageExit"
      }
    ]
  },
  {
    "question": "what_kind_of_digital_device_do_you_use",
    "answers": [
      {
        "text": "a_desktop_or_laptop_computer",
        "exit": "nextStep"
      },
      {
        "text": "a_smartphone",
        "exit": "nextStep"
      },
      {
        "text": "a_tablet_or_ipad",
        "exit": "nextStep"
      },
      {
        "text": "something_else",
        "exit": "nextStep"
      }
    ]
  },
  {
    "question": "would_you_like_to_save_money",
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
    "question": "how_interested_are_you_in_learning_modern",
    "answers": [
      {
        "text": "very_interested",
        "exit": "nextStep"
      },
      {
        "text": "somewhat_interested",
        "exit": "nextStep"
      },
      {
        "text": "not_interested_at_all",
        "exit": "nextStep"
      }
    ]
  },
  {
    "question": "what_is_your_gender_identity",
    "answers": [
      {
        "text": "woman",
        "exit": "progress"
      },
      {
        "text": "man",
        "exit": "progress"
      },
      {
        "text": "other",
        "exit": "progress"
      }
    ]
  },
  {
    "answers": [
      {
        "text": "start_now",
        "exit": "mainExit"
      }
    ]
  }
]
