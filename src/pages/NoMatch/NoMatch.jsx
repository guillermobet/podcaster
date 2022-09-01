import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full pb-32">
      <div className="font-semibold mb-4">Route not found</div>
      <button
        className="focus:ring border p-2"
        onClick={() => navigate("/", { replace: true })}
      >
        Home
      </button>
    </div>
  );
};

export default NoMatch;
