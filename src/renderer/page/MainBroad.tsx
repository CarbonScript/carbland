import CodeEditor from 'renderer/component/CodeEditor';
import { useRef, useState } from 'react';
import { StatusBar } from 'renderer/component/StatusBar';

export const MainBroad = () => {
  const [editor_value, set_editor_value] = useState<string>('aaaaaaa');
  const editor_ref = useRef();

  // Receive the icp message.
  window.electron.ipcRenderer.on('open-file', (value: string) => {
    set_editor_value(value);
    console.log(value);
  });

  window.electron.ipcRenderer.on('fetch-editor',()=>{
    window.electron.ipcRenderer.sendMessage('give-editor',editor_value);
  })

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
      }}
    >
      <div
        className="tw-h-screen tw-w-screen"
        style={{ height: 'calc(100vh - 22px)' }}
      >
        <CodeEditor value={editor_value} />
      </div>
      <div style={{ height: '22px' }}>
        <StatusBar text="This is The Status Bar" />
      </div>
    </div>
  );
};

export default MainBroad;
