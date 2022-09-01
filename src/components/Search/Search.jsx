import { useEffect } from "react";
import { useData } from "../../context/data-context";
import { getPodcasts } from "../../api/podcasts";
import { useState } from "react";

const Search = () => {
  const [, setData] = useData();
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
    setData((state) => ({
      ...state,
      filteredPodcasts: state.podcasts.filter((podcast) => {
        return (
          podcast["im:artist"].label
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          podcast["im:name"].label
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        );
      }),
    }));
  };

  useEffect(() => {
    setData((state) => ({
      ...state,
      status: "pending",
    }));
    getPodcasts()
      .then((res) => {
        setData((state) => ({
          ...state,
          status: "resolved",
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
  }, [setData]);

  return (
    <div className="mb-4">
      <div className="flex flex-row justify-end items-center w-full my-4">
        <div className="flex flex-row justify-end mr-2">
          <input
            id="filter"
            type="text"
            className="border p-2 w-full"
            value={filter}
            onChange={handleChange}
            placeholder="Filter podcasts..."
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
