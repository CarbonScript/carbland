import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'renderer/hooks';
import { initEditor } from 'renderer/slice/CodeEditorSlice';

const CodeEditor = () => {

  // Reference the dom that mounted monaco-editor
  const dom_ref = useRef<HTMLDivElement | null>(null);

  // Code dispatcher
  const dispatchCode = useAppDispatch();

  useEffect(()=>{
    dispatchCode(initEditor(dom_ref.current));
  },[])

  return <div style={{ height: '100%', width: '100%' }} ref={dom_ref} />;
};

export default CodeEditor;
