import { ADD_NOTE,DELETE_NOTE,LOAD_NOTES } from "../type";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loadNotes = (day) => async dispatch => {
    console.log(day);
    
    try {
      const savedNotes = await AsyncStorage.getItem(`notes_${day}`);
      const notes = savedNotes ? JSON.parse(savedNotes) : [];
      dispatch({ type: LOAD_NOTES, day, notes });
    } catch (error) {
      console.log("Failed to load notes", error);
    }
  };
  
  export const addNote = (day, note) => async dispatch => {
    try {
      await AsyncStorage.setItem(`notes_${day}`, JSON.stringify([...notes, note]));
      dispatch({ type: ADD_NOTE, day, note });
    } catch (error) {
      console.log("Failed to add note", error);
    }
  };
  
  export const deleteNote = (day, noteId) => async dispatch => {
    try {
      const savedNotes = await AsyncStorage.getItem(`notes_${day}`);
      const notes = savedNotes ? JSON.parse(savedNotes) : [];
      const updatedNotes = notes.filter(note => note.id !== noteId);
      await AsyncStorage.setItem(`notes_${day}`, JSON.stringify(updatedNotes));
      dispatch({ type: DELETE_NOTE, day, noteId });
    } catch (error) {
      console.log("Failed to delete note", error);
    }
  };
  