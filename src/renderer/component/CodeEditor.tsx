import { editor } from 'monaco-editor';
import { FunctionComponent, useEffect, useId } from 'react';

interface CodeEditorProps {}

const CodeEditor: FunctionComponent<CodeEditorProps> = () => {
  const dom_id = useId();

  useEffect(() => {
    if (document.getElementById(dom_id)) {
      let dom: editor.IStandaloneCodeEditor | undefined = editor.create(
        document.getElementById(dom_id) as HTMLElement,
        {
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vs-dark',
          language: 'typescript',
          minimap: {
            enabled: false,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    console.log('rendering');
  });

  return <div style={{ height: '100%', width: '100%' }} id={dom_id} />;
};

export default CodeEditor;
