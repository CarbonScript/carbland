import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hook/redux-hooks';
import {
  CHANNEL_FETCH_CODE_TO_SAVE,
  CHANNEL_OPEN_FILE,
  CHANNEL_SAVE_FILE,
  CHANNEL_SET_CODEMAP,
} from 'renderer/renderer-channels';
import { initEditor, selectEditor } from 'renderer/slice/CodeEditorSlice';

// Default options for editor
// For more options, documentation is here
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
export const defaultEditorOption: editor.IStandaloneEditorConstructionOptions =
  {
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

/**
 * Return the code editor instance mounted on div element.
 *
 * *** WARNING ***
 *
 * This component can only be used once in React.
 * Likewise, the parent component that uses this component,
 * as well as the higher-level ancestor component, can only be called once in React.
 * Because the instance it mounts is only stored in one redux-store.
 * If this component is reused multiple times, it will cause repeated mounting,
 * which will lead to unpredictable consequences
 * @return {JSX.Element} Return a CodeEditor JSX Element
 */
const CodeEditor = () => {
  // Reference the dom that mounted monaco-editor
  const dom_ref = useRef<HTMLDivElement | null>(null);

  const removeListeners = () => {
    window.electron.ipcRenderer.removeAllListeners(CHANNEL_FETCH_CODE_TO_SAVE);
    window.electron.ipcRenderer.removeAllListeners(CHANNEL_SAVE_FILE);
    window.electron.ipcRenderer.removeAllListeners(CHANNEL_SET_CODEMAP);
  };

  // Code dispatcher
  const dispatchEditor = useAppDispatch();

  // Hooks the editor instance from redux store.
  const selectEditorInstance = useAppSelector(selectEditor);

  useEffect(() => {
    if (selectEditorInstance === null) {
      dispatchEditor(
        initEditor({ domRef: dom_ref.current, options: defaultEditorOption })
      );
    }
    selectEditorInstance?.render();
  }, []);

  useEffect(() => {
    // Clean listeners every renders.
    removeListeners();
    /**
     * Listener for setting codemap.
     */
    window.electron.ipcRenderer.on(CHANNEL_SET_CODEMAP, (toggle: boolean) => {
      selectEditorInstance?.updateOptions({ minimap: { enabled: toggle } });
    });
    /**
     * After receiving the channel information for the open file,
     * stream the string into the editor.
     */
    window.electron.ipcRenderer.on(CHANNEL_OPEN_FILE, (value: string) => {
      selectEditorInstance?.setValue(value);
    });

    /**
     * After receiving the channel signal to get the code,
     * transmit the content in the editor to the main process by the channel that saves the action
     */
    window.electron.ipcRenderer.on(CHANNEL_FETCH_CODE_TO_SAVE, () => {
      window.electron.ipcRenderer.sendMessage(
        CHANNEL_SAVE_FILE,
        selectEditorInstance?.getValue()
      );
    });
    return removeListeners;
  });

  return <div className=" tw-h-full tw-w-full" ref={dom_ref} />;
};

export default CodeEditor;
