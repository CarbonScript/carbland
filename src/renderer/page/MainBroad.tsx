import { useEffect } from 'react';
import CodeEditor from 'renderer/component/CodeEditor';
import { StatusBar } from 'renderer/component/StatusBar';
import { useAppSelector } from 'renderer/hook/redux-hooks';
import { selectEditor } from 'renderer/slice/CodeEditorSlice';

export const MainBroad = () => {
  // Hooks the editor instance from redux store.
  const editor = useAppSelector(selectEditor);

  useEffect(() => {
    /**
     * *** WARNING ***
     * Every time the component is re-rendered,
     * in order to ensure that the instance obtained from the store is up-to-date,
     * the listener must be reset. However, the same channel of the icpMain listener will not be overwritten,
     * so before resetting the listener, remove all previous listeners.
     */

    window.electron.ipcRenderer.removeAllListeners('fetch-code');
    window.electron.ipcRenderer.removeAllListeners('save-file');

    window.electron.ipcRenderer.on('open-file', (value: string) => {
      editor?.setValue(value);
      console.log('read:', value);
    });

    window.electron.ipcRenderer.on('fetch-code', () => {
      window.electron.ipcRenderer.sendMessage(
        'save-file',
        editor?.getValue()
      );
    });
  });

  return (
    <div className="tw-h-screen tw-w-screen tw-bg-gray-800">
      <div style={{ height: 'calc(100vh - 22px)', width: '100vw' }}>
        <CodeEditor />
      </div>
      <div style={{ height: '22px' }}>
        <StatusBar text="This is The Status Bar" />
      </div>
    </div>
  );
};

export default MainBroad;
