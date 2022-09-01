import Content from "../../components/Content";
import PodcastSummary from "../../components/PodcastSummary";
import EpisodeInfo from "../../components/EpisodeInfo";
import { useData } from "../../context/data-context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Podcast = () => {
  const [data] = useData();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || !Object.keys(data).length) {
      navigate(`/podcast/${params.podcastId}`, {
        replace: false,
      });
    }
  }, [data, navigate, params.podcastId]);

  if (data.status === "resolved") {
    return (
      <Content>
        <div className="flex flex-row justify-between">
          <PodcastSummary onClick />
          <EpisodeInfo />
        </div>
      </Content>
    );
  }
};

export default Podcast;
