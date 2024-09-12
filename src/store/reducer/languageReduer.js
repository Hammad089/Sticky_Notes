import { SELECT_LANGUAGE } from "../type";
const initialState = {
  selectedLanguageName: "English",
  selectedLanguage: {
    hello_ther: "Hello there",
    quick_easy_create_notes: "Quickly and easy create notes",
    plan_your_week: "Plan Your Week",
    easy_jot_down_goal:
      "Easily jot down your goals, tasks, and events for the week ahead",
    Start_organizing_your_week_like_a_pro:
      "Start organizing your week like a pro",
    Dive_in_now_and_transform_how_you_plan_your_days:
      " Dive in now and transform how you plan your days.",
    lets_go: `Let's Go`,
    no_notes_availible: "No notes availible",
    create_your_first_note: "Create your first note",
    Privacy_Policy: "Privacy Policy",
    Rate_us: "Rate Us",
    Share_App: "Share App",
    MoreApps: "More App",
  },
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return {
        ...state,
        selectedLanguageName: action.payload.selectedLanguageName,
        selectedLanguage: action.payload.selectedLanguage,
      };
    default:
      return state;
  }
};
