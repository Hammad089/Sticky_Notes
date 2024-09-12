import { ADD_NOTE,DELETE_NOTE,LOAD_NOTES } from "../type";
export const initialState = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };
  
  const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_NOTE:
        return {
          ...state,
          [action.day]: [...state[action.day], action.note],
        };
      case DELETE_NOTE:
        return {
          ...state,
          [action.day]: state[action.day].filter(note => note.id !== action.noteId),
        };
      case LOAD_NOTES:
        return {
          ...state,
          [action.day]: action.notes,
        };
      default:
        return state;
    }
  };
  
  export default notesReducer;
  