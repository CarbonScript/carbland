export const StatusBar = (props: { text?: string }) => {
  return (
    <div className=" tw-h-full tw-px-2 tw-py-0 tw-flex tw-bg-blue-500 tw-select-none tw-text-xs">
      <span className=" tw-text-white tw-my-auto">{props.text}</span>
    </div>
  );
};
