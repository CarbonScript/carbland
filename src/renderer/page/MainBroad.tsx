import { useEffect } from 'react';
import {
  CHANNEL_FETCH_CODE_TO_SAVE,
  CHANNEL_OPEN_FILE,
  CHANNEL_SAVE_FILE,
} from 'renderer/renderer-channels';
import CodeEditor from 'renderer/component/CodeEditor';
import { StatusBar } from 'renderer/component/StatusBar';
import { useAppSelector } from 'renderer/hook/redux-hooks';
import { selectEditor } from 'renderer/slice/CodeEditorSlice';

/**
 * MainBroad page in application.
 * @returns MainBroad Page Component.
 */
export const MainBroad = () => {
  /**
   * *** WARNING ***
   * Every time the component is re-rendered,
   * in order to ensure that the instance obtained from the store is up-to-date,
   * the listener must be reset. However, the same channel of the icpMain listener will not be overwritten,
   * so before resetting the listener, remove all previous listeners.
   */

  // Hooks the editor instance from redux store.
  const selectEditorInstance = useAppSelector(selectEditor);

  // This function is used to remove the listener to avoid repeated monitoring
  const removeListeners = () => {
    window.electron.ipcRenderer.removeAllListeners(CHANNEL_FETCH_CODE_TO_SAVE);
    window.electron.ipcRenderer.removeAllListeners(CHANNEL_SAVE_FILE);
  };

  useEffect(() => {
    // Clean listeners every renders.
    removeListeners();

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

  return (
    <div className="tw-h-screen tw-w-screen tw-bg-gray-800">
      <div style={{ height: 'calc(100vh - 22px)', width: '100vw' }}>
        <CodeEditor />
      </div>
      <div style={{ height: '22px' }}>
        <StatusBar mode="notify" text="This is The Status Bar" />
      </div>
    </div>
  );
};

export default MainBroad;
