import { useNavigate } from "react-router-dom";
import { useData } from "../../context/data-context";

const PodcastCard = (podcast) => {
  const [, setData] = useData();
  const navigate = useNavigate();

  const goToPodcast = (podcast) => {
    setData((state) => ({
      ...state,
      status: "pending",
    }));
    navigate(`/podcast/${podcast.id.attributes["im:id"]}`, {
      replace: false,
    });
  };

  return (
    <div
      className="flex flex-col w-40 m-2 cursor-pointer"
      onClick={() => goToPodcast(podcast)}
    >
      <img
        src={podcast["im:image"][2].label}
        width={170}
        height={170}
        alt="Podcast cover"
      />
      <div className="mt-1 h-24">
        <div className="text-xs font-bold break-words pb-1">
          {podcast["im:name"].label}
        </div>
        <div className="text-xs break-words">
          Author: {podcast["im:artist"].label}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
