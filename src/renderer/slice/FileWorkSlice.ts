import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
export interface FileWorkState {
  OpenedFilePath: string | undefined;
  isSaved: boolean;
}

// Action for setting filepath
export interface SetFilePathAction {
  type: string;
  payload: string;
}

// Action for setting file saving state
export interface SetFileSaveAction {
  type: string;
  payload: boolean;
}

// Define the initial editor state.
const initialState: FileWorkState = {
  OpenedFilePath: undefined,
  isSaved: false,
};

// Create the editor state.
export const FileWorkSlice = createSlice({
  name: 'fileWork',
  initialState,
  reducers: {
    /**
     * Set a new path for the opened file.
     * @param state The filework state
     * @param action The dispatched action
     * @returns Returned new state
     */
    setFilePath: (state: FileWorkState, action: SetFilePathAction) => {
      return { ...state, OpenedFilePath: action.payload };
    },
    /**
     * Set save state for open files.
     * @param state The filework state
     * @param action The dispatched action
     * @returns Returned new state
     */
    setFileSaveState: (state: FileWorkState, action: SetFileSaveAction) => {
      return { ...state, isSaved: action.payload };
    },
  },
});

export const { setFilePath: setFileName, setFileSaveState: setFileSave } =
  FileWorkSlice.actions;

/**
 * Select the path of the opened file.
 * @param state The Root state in redux
 * @returns Opened file path
 */
export const selectOpenedFilePath = (state: RootState) => {
  return state.fileWork.OpenedFilePath;
};

/**
 * Select is-saved state of opened file.
 * @param state The Root state in redux
 * @returns
 */
export const selectIsFileSaved = (state: RootState) => {
  return state.fileWork.isSaved;
};

export default FileWorkSlice.reducer;
