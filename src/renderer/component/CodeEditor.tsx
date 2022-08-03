import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';
import { selectCode, writeIn } from 'renderer/slice/CodeEditorSlice';

const CodeEditor = (props: {
  minimap: boolean;
}) => {

  // Reference the dom that mounted monaco-editor
  const dom_ref = useRef<HTMLDivElement | null>(null);
  
  // Store the codeEditor instance
  const [codeEditor, setCodeEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);

  // Hook the state from store
  const code = useAppSelector(selectCode);

  // Code dispatcher
  const dispatchCode = useAppDispatch();

  useEffect(() => {
    if (dom_ref.current) {
      setCodeEditor(
        editor.create(dom_ref.current!, {
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vs-dark',
          language: 'typescript',
          minimap: {
            enabled: props.minimap,
          },
          value: code,
          fontFamily: 'consolas,Microsoft YaHei',
        })
      );
    }
  }, []);

  useEffect(()=>{
    codeEditor?.getModel()?.setValue(code!);
  },[code])

  useEffect(() => {
    codeEditor?.setValue(code!);
    codeEditor?.getModel()?.onDidChangeContent((_e) => {
      dispatchCode(writeIn(codeEditor.getValue()));
    });

  }, [codeEditor, props.minimap]);

  useEffect(() => {
    console.log('The code editor instance has changed');
  },[codeEditor]);

  return <div style={{ height: '100%', width: '100%' }} ref={dom_ref} />;
};

CodeEditor.defaultProps = {
  minimap: true,
};

export default CodeEditor;
