import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';
import {
  CodeEditorState,
  selectCode,
  writeIn,
} from 'renderer/slice/CodeEditorSlice';

const CodeEditor = (props: {
  value?: string;
  minimap: boolean;
  getValue?: () => string | undefined;
}) => {
  const dom_ref = useRef<HTMLDivElement | null>(null);
  const [codeEditor, setCodeEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const code = useAppSelector(selectCode);
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
    codeEditor?.getModel()?.onDidChangeContent((e) => {
      dispatchCode(writeIn(codeEditor.getValue()));
      console.log(code);
    });
  }, []);

  useEffect(() => {
    codeEditor?.setValue(code!);
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
