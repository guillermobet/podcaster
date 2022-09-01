import Content from "../../components/Content";
import PodcastSummary from "../../components/PodcastSummary";
import EpisodesList from "../../components/EpisodesList";
import { useEffect } from "react";
import { useData } from "../../context/data-context";
import { getPodcastById, getPodcasts } from "../../api/podcasts";
import { useNavigate, useParams } from "react-router-dom";

const Podcast = () => {
  const [data, setData] = useData();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.podcasts) {
      getPodcasts()
        .then((res) => {
          setData((state) => ({
            ...state,
            podcasts: res,
            filteredPodcasts: res,
          }));
        })
        .catch((err) => {
          console.error(err);
          setData({
            status: "rejected",
            error: err,
          });
        });
    }
    getPodcastById({ id: params.podcastId })
      .then((res) => {
        setData((state) => ({
          ...state,
          currentPodcast: res,
          status: "resolved",
        }));
      })
      .catch((err) => {
        console.error(err);
        setData({
          status: "rejected",
          error: err,
        });
      });
  }, [data.podcasts, setData, params.podcastId, navigate]);

  if (data.status === "resolved") {
    return (
      <Content>
        <div className="flex flex-row justify-between">
          <PodcastSummary />
          <EpisodesList />
        </div>
      </Content>
    );
  }
};

export default Podcast;
