import { editor } from 'monaco-editor';
import { FunctionComponent, useEffect, useId } from 'react';

interface CodeEditorProps {}

const CodeEditor: FunctionComponent<CodeEditorProps> = () => {
  const dom_id = useId();
  let dom: editor.IStandaloneCodeEditor | undefined;

  useEffect(() => {
    if (document.getElementById(dom_id)) {
      dom = editor.create(document.getElementById(dom_id) as HTMLElement,{
        automaticLayout:true,
        theme:"vs-dark",
        minimap:{
            enabled:false
        }
      });
    }
  }, []);


  return <div style={{ width: '100%', height: '100%' }} id={dom_id} />;
};

export default CodeEditor;
