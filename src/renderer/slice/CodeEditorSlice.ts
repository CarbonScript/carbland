import { createSlice } from '@reduxjs/toolkit';
import { editor } from 'monaco-editor';
import type { RootState } from '../store';

// Define a type for the slice state
export interface CodeEditorState {
  editor: editor.IStandaloneCodeEditor | null | undefined;
}

// Define the initial state using that type
const initialState: CodeEditorState = {
  editor: null,
};

// Create the editor state.
export const CodeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    initEditor: (_state: CodeEditorState, action) => {
      return {
        editor: editor.create(action.payload!, {
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vs-dark',
          language: 'typescript',
          minimap: {
            enabled: true,
          },
          value: '',
          fontFamily: 'consolas,Microsoft YaHei',
        }),
      };
    },
    writeIn: (state: CodeEditorState, action) => {
      state.editor?.getModel()?.setValue(action.payload);
    }
  },
});

export const { initEditor, writeIn } = CodeEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEditor = (state: RootState) => state.codeEditor.editor;

export default CodeEditorSlice.reducer;
