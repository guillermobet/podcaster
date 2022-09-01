import { useData } from "../../context/data-context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [data, setData] = useData();
  const navigate = useNavigate();

  const goToHome = () => {
    setData((state) => ({
      ...state,
      status: "pending",
    }));
    navigate("/", {
      replace: false,
    });
  };

  return (
    <div className="flex flex-row justify-between items-center bg-black text-white font-semibold text-2xl p-4">
      <div className="cursor-pointer" onClick={goToHome}>
        Podcaster
      </div>
      {data.status === "pending" ? (
        <div className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
