import CodeEditor from 'renderer/component/CodeEditor';

export const MainBroad = () => {
  return (
    <div className="tw-h-screen tw-w-screen tw-flex tw-bg-black">
      <div className=" tw-basis-1/3 "></div>
      <div className=" tw-basis-2/3 tw-flex-shrink">
        <CodeEditor />
      </div>
    </div>
  );
};

export default MainBroad;
