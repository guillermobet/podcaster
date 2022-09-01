import { useData } from "../../context/data-context";
import { removeXmlTags } from "../../utils/xmlParser";

const EpisodesList = () => {
  const [data] = useData();

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 py-4 shadow-md">
        <div className="font-semibold text-base mb-4">
          {removeXmlTags(
            data.currentEpisode.getElementsByTagName("title")[0]
          ) ||
            removeXmlTags(
              data.currentEpisode.getElementsByTagName("itunes")[0]
            )}
        </div>
        <div className="divide-y">
          <div className="text-xs italic mb-4 break-words">
            {data.currentEpisode.getElementsByTagName("description")[0] ||
            data.currentEpisode.getElementsByTagName("content:encoded")[0] ? (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data.currentEpisode.getElementsByTagName("description")[0]
                      .textContent ||
                    data.currentEpisode.getElementsByTagName(
                      "content:encoded"
                    )[0].textContent,
                }}
              ></div>
            ) : (
              "Description not provided"
            )}
          </div>
          {data.currentEpisode
            .getElementsByTagName("enclosure")[0]
            .getAttribute("url") ||
          data.currentEpisode
            .getElementsByTagName("media:content")[0]
            .getAttribute("url") ? (
            <div className="pt-4">
              <audio controls className="w-full">
                <source
                  src={
                    data.currentEpisode
                      .getElementsByTagName("enclosure")[0]
                      .getAttribute("url") ||
                    data.currentEpisode
                      .getElementsByTagName("media:content")[0]
                      .getAttribute("url")
                  }
                  type="audio/mpeg"
                />
              </audio>
            </div>
          ) : (
            <div>Audio not provided</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodesList;
