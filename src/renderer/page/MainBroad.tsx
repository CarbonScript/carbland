import CodeEditor from 'renderer/component/CodeEditor';

export const MainBroad = () => {
  return (
    <div className="tw-max-h-screen tw-w-screen tw-bg-black tw-flex tw-justify-center">
      <div className=' tw-h-screen tw-w-screen'>
        <CodeEditor />
      </div>
    </div>
  );
};

export default MainBroad;
