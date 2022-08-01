import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';

const CodeEditor = (props: { value?: string; minimap: boolean }) => {
  const dom_ref = useRef<HTMLDivElement | null>(null);
  const [codeEditor, setCodeEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);

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
          value: props.value,
        })
      );
    }
  }, []);

  useEffect(() => {
    codeEditor?.setValue(props.value!);
  }, [codeEditor, props.value, props.minimap]);

  useEffect(() => {
    console.log('rendering');
  });

  return <div style={{ height: '100%', width: '100%' }} ref={dom_ref} />;
};

CodeEditor.defaultProps = {
  minimap: true,
};

export default CodeEditor;
