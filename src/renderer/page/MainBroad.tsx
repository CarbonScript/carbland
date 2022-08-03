import CodeEditor from 'renderer/component/CodeEditor';
import { StatusBar } from 'renderer/component/StatusBar';
import { useAppSelector } from 'renderer/hooks';
import { selectEditor } from 'renderer/slice/CodeEditorSlice';

export const MainBroad = () => {

  // Hooks the editor instance from redux store.
  const editor = useAppSelector(selectEditor);

  // Receive the icp message.
  window.electron.ipcRenderer.on('open-file', (value: string) => {
    editor?.setValue(value);
    console.log('read:',value);
  });

  window.electron.ipcRenderer.on('fetch-editor', () => {
    window.electron.ipcRenderer.sendMessage('give-editor', editor?.getValue());
  });

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
      }}
    >
      <div
        className=""
        style={{ height: 'calc(100vh - 22px)', width: '100vw' }}
      >
        <CodeEditor />
      </div>
      <div style={{ height: '22px' }}>
        <StatusBar text="This is The Status Bar" />
      </div>
    </div>
  );
};

export default MainBroad;
