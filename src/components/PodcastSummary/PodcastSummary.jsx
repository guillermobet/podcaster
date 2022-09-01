import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/data-context";
import { getElementByXpath, removeXmlTags } from "../../utils/xmlParser";

const PodcastSummary = (props) => {
  const { onClick = false } = props;
  const [data, setData] = useData();
  const params = useParams();
  const navigate = useNavigate();

  const goToPodcast = () => {
    setData((state) => ({
      ...state,
      status: "pending",
    }));
    navigate(`/podcast/${params.podcastId}`, {
      replace: false,
    });
  };

  return (
    <div className="flex flex-col items-center w-72 mr-4">
      <div className="px-4 divide-y shadow-lg">
        <div
          className={`flex flex-row justify-center py-4 ${
            onClick ? "cursor-pointer" : ""
          }`}
          onClick={onClick ? goToPodcast : undefined}
        >
          <img
            src={data.currentPodcast.podcastData.results[0].artworkUrl600}
            width={170}
            height={170}
            alt="Podcast cover"
            className="rounded-md"
          />
        </div>
        <div
          className={`flex flex-col w-full py-4 ${
            onClick ? "cursor-pointer" : ""
          }`}
          onClick={onClick ? goToPodcast : undefined}
        >
          <div className="text-sm font-semibold">
            {data.currentPodcast.podcastData.results[0].collectionName}
          </div>
          <div className="text-xs italic">
            by {data.currentPodcast.podcastData.results[0].artistName}
          </div>
        </div>

        <div className="flex flex-col w-full py-4">
          <div className="text-xs font-semibold pb-1">Description</div>
          <div className="text-xs italic break-words text-ellipsis">
            {removeXmlTags(
              getElementByXpath(
                "rss/channel/description",
                data.currentPodcast.podcastRSS
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastSummary;
