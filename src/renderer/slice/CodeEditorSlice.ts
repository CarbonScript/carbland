import { createSlice } from '@reduxjs/toolkit';
import { editor } from 'monaco-editor';
import type { RootState } from '../store';

// Define a type for the slice state
export interface CodeEditorState {
  editorInstance: editor.IStandaloneCodeEditor | null | undefined;
  editorOption: editor.IStandaloneEditorConstructionOptions | undefined;
}

// Define the initial state using that type
const initialState: CodeEditorState = {
  editorInstance: null,
  editorOption: {},
};

// Create the editor state.
export const CodeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    initEditor: (_state: CodeEditorState, action) => {
      const defaultEditorOption: editor.IStandaloneEditorConstructionOptions = {
        scrollBeyondLastLine: false,
        automaticLayout: true,
        theme: 'vs-dark',
        language: 'typescript',
        minimap: {
          enabled: true,
        },
        value: '',
        fontFamily: 'consolas,Microsoft YaHei',
      };
      return {
        editorInstance: editor.create(action.payload!, defaultEditorOption),
        editorOption: defaultEditorOption,
      };
    },
  },
});

export const { initEditor } = CodeEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEditor = (state: RootState) => {
  return state.codeEditor.editorInstance;
};

export default CodeEditorSlice.reducer;
