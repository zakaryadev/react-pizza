import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayouts = ({ searchValue, setSearchValue }) => {
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
