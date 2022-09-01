import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/data-context";
import { getElementsByXpath, removeXmlTags } from "../../utils/xmlParser";

const EpisodesList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useData();
  const episodes = getElementsByXpath(
    "rss/channel/item[*]",
    data.currentPodcast.podcastRSS
  );

  const goToEpisode = (episode) => {
    setData((state) => ({
      ...state,
      currentEpisode: episode,
    }));
    navigate(
      `/podcast/${params.podcastId}/episode/${removeXmlTags(
        episode.getElementsByTagName("guid")[0]
      )}`,
      {
        replace: false,
      }
    );
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="font-semibold text-base px-6 py-4 mb-4 shadow-md">
        Episodes: {episodes.length}
      </div>
      <div className="p-6 divide-y shadow-lg">
        <div className="flex flex-row items-center font-semibold text-base w-full mb-2">
          <div className="w-8/12">Title</div>
          <div className="flex flex-row justify-end w-2/12">Date</div>
          <div className="flex flex-row justify-end w-2/12">Duration</div>
        </div>
        {episodes.map((episode) => {
          return (
            <div
              className="flex flex-row items-center text-xs"
              key={removeXmlTags(episode.getElementsByTagName("guid")[0])}
            >
              <div
                className="w-8/12 py-1 cursor-pointer hover:underline text-cyan-600"
                onClick={() => goToEpisode(episode)}
              >
                {removeXmlTags(episode.getElementsByTagName("title")[0])}
              </div>
              <div className="flex flex-row justify-end w-2/12">
                {(() => {
                  const date = new Date(
                    episode.getElementsByTagName("pubDate")[0].innerHTML
                  );
                  return [
                    date.getDate().toString().padStart(2, "0"),
                    (date.getMonth() + 1).toString().padStart(2, "0"),
                    date.getFullYear(),
                  ].join("/");
                })()}
              </div>
              <div className="flex flex-row justify-end w-2/12">
                {(() => {
                  let duration =
                    episode.getElementsByTagName("itunes:duration")[0]
                      ?.innerHTML;
                  duration =
                    duration && duration.includes(":")
                      ? duration
                      : duration && !duration.includes(":")
                      ? (() => {
                          const seconds = +duration;
                          const h = Math.floor(seconds / 3600)
                              .toString()
                              .padStart(2, "0"),
                            m = Math.floor((seconds % 3600) / 60)
                              .toString()
                              .padStart(2, "0"),
                            s = Math.floor(seconds % 60)
                              .toString()
                              .padStart(2, "0");

                          return (h === "00" ? "" : h + ":") + m + ":" + s;
                        })()
                      : "unknown";

                  return duration;
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodesList;
