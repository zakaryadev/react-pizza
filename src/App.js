import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PizzaDetails from "./pages/PizzaDetails";
import NoutFound from "./pages/NoutFound";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayouts
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        }
      >
        <Route index element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaDetails />} />
        <Route path="*" element={<NoutFound />} />
      </Route>
    </Routes>
  );
}

export default App;
