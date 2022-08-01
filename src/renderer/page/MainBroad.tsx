import CodeEditor from 'renderer/component/CodeEditor';
import { useState } from 'react';

export const MainBroad = () => {
  const [editor_value, set_editor_value] = useState<string>('');

  window.electron.ipcRenderer.on('open-file',(value:string)=>{
    set_editor_value(value)
    console.log(value);
  })

  return (
    <div className="tw-max-h-screen tw-w-screen tw-bg-black">
      <div
        className="tw-h-screen tw-w-screen"
        style={{ height: 'calc(100vh - 22px)' }}
      >
        <CodeEditor value={editor_value} />
      </div>
      <div
        className=" tw-bg-blue-600"
        style={{
          height: '22px',
          padding: ' 0px 10px',
          backgroundColor: 'rgb(0,122,204)',
        }}
      >
        <span className=" tw-text-white">这是状态栏</span>
      </div>
    </div>
  );
};

export default MainBroad;
