import { useState } from 'react';
import CodeEditor from 'renderer/component/CodeEditor';
import { StatusBar } from 'renderer/component/StatusBar';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';
import { selectCode, writeIn } from 'renderer/slice/CodeEditorSlice';

export const MainBroad = () => {
  const code = useAppSelector(selectCode);
  const dispatchCode = useAppDispatch();
  // Receive the icp message.
  window.electron.ipcRenderer.on('open-file', (value: string) => {
    dispatchCode(writeIn(value));
    console.log(value);
  });

  window.electron.ipcRenderer.on('fetch-editor', () => {
    window.electron.ipcRenderer.sendMessage('give-editor', code);
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
