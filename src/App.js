import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";
import NoMatch from "./pages/NoMatch";

import Header from "./components/Header";

import { DataProvider } from "./context/data-context";

const App = () => {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<Episode />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </DataProvider>
  );
};

export default App;
