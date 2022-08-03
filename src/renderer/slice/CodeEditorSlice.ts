import { createSlice } from '@reduxjs/toolkit';
import { editor } from 'monaco-editor';
import type { RootState } from '../store';

/**
 *  WARNING: Created Editor Instance is Unserializable
 *
 *      Since created editor instance is not serializable.
 *      So you have to be careful when modifying the editor instance in storage.
 *      Please try to take this action: destroy the original editor and create a new editor.
 *      When accessing editor instances in storage, operate with selectors, not dispatchers.
 *      Please pay attention to the console error message when debugging.
 */

// Define a type for the slice state
export interface CodeEditorState {
  editorInstance: editor.IStandaloneCodeEditor | null;
  editorOption: editor.IStandaloneEditorConstructionOptions | undefined;
}

export interface InitEditorAction {
  type: string;
  payload: HTMLDivElement | null;
}

// Define the initial editor state.
const initialState: CodeEditorState = {
  editorInstance: null,
  editorOption: {},
};

// Default options for editor
// For more options, documentation is here
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
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

// Create the editor state.
export const CodeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    initEditor: (_state: CodeEditorState, action: InitEditorAction) => {
      console.log(action);
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
