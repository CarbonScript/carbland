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

  return <div style={{ width: '100%', height: '100%' }} id={dom_id} />;
};

export default CodeEditor;
