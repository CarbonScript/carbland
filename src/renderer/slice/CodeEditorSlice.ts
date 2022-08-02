import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
export interface CodeEditorState {
  value: string;
}

// Define the initial state using that type
const initialState: CodeEditorState = {
  value: 'Initail code',
};

export const CodeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    writeIn: (state: CodeEditorState, action) => {
      return { ...state, value: action.payload };
    },
    cleanEditor: (state: CodeEditorState) => {
      return { ...state, value: '' };
    },
  },
});

export const { cleanEditor, writeIn } = CodeEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCode = (state: RootState) => state.codeEditor.value;

export default CodeEditorSlice.reducer;
