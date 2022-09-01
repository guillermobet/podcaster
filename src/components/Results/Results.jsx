import { useData } from "../../context/data-context";
import PodcastCard from "../PodcastCard/PodcastCard";

const Results = () => {
  const [data] = useData();

  if (data.status === "rejected") {
    return (
      <>
        <div>There was an error while retrieving the podcasts 😔</div>
        <div>{data.error.message}</div>
      </>
    );
  }

  if (data.status === "resolved") {
    return (
      <div
        className="flex flex-row flex-wrap justify-center items-center"
        title="results"
      >
        {data.filteredPodcasts.map((podcast) => {
          return (
            <div key={podcast.id.attributes["im:id"]}>
              <PodcastCard {...podcast} />
            </div>
          );
        })}
      </div>
    );
  }

  return;
};

export default Results;
