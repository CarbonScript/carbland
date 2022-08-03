import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'renderer/hook/redux-hooks';
import { initEditor } from 'renderer/slice/CodeEditorSlice';

/**
 * Return the code editor instance mounted on div element.
 * 
 * *** WARNING *** 
 * 
 * This component can only be used once in React.
 * Because the instance it mounts is only stored in one redux-store.
 * If this component is reused multiple times, it will cause repeated mounting,
 * which will lead to unpredictable consequences
 * @return {JSX.Element} Return a CodeEditor JSX Element
 */
const CodeEditor = () => {
  // Reference the dom that mounted monaco-editor
  const dom_ref = useRef<HTMLDivElement | null>(null);

  // Code dispatcher
  const dispatchCode = useAppDispatch();

  useEffect(() => {
    dispatchCode(initEditor(dom_ref.current));
  }, []);

  return <div style={{ height: '100%', width: '100%' }} ref={dom_ref} />;
};

export default CodeEditor;
