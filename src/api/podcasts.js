import axios from "axios";

const getPodcasts = async () => {
  try {
    const timestamp = new Date();
    let podcasts = JSON.parse(localStorage.getItem("podcasts")) || null;
    if (!podcasts || podcasts.expiration < timestamp) {
      const response = await axios.get(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      timestamp.setDate(timestamp.getDate() + 1);
      podcasts = {
        response,
        expiration: timestamp.getTime(),
      };
      localStorage.setItem("podcasts", JSON.stringify(podcasts));
    }

    return podcasts.response.data.feed.entry;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getPodcastById = async ({ id }) => {
  try {
    const podcastData = JSON.parse(
      (
        await axios.get(
          `https://api.allorigins.win/get?url=${encodeURI(
            `https://itunes.apple.com/lookup?id=${id}`
          )}`
        )
      ).data.contents
    );

    const podcastFeed = (
      await axios.get(
        `https://api.allorigins.win/get?url=${encodeURI(
          podcastData.results[0].feedUrl
        )}`
      )
    ).data.contents;

    const xmlParser = new DOMParser();
    const podcastRSS = xmlParser.parseFromString(
      podcastFeed,
      "application/xml"
    );

    return { podcastData, podcastRSS };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { getPodcasts, getPodcastById };
