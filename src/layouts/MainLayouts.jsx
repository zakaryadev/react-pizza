import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export const SearchContext = React.createContext("asdasda");
const MainLayouts = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default MainLayouts;
