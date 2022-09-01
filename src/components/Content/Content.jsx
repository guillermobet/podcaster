const Content = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-4/5 my-2">{children}</div>
    </div>
  );
};

export default Content;
