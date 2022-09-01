import Results from "../../components/Results";
import Search from "../../components/Search";
import Content from "../../components/Content";

const Layout = () => {
  return (
    <div className="flex flex-col w-full">
      <Content>
        <Search />
        <Results />
      </Content>
    </div>
  );
};

export default Layout;
