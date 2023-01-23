import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PizzaDetails from "./pages/PizzaDetails";
import NoutFound from "./pages/NoutFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaDetails />} />
        <Route path="*" element={<NoutFound />} />
      </Route>
    </Routes>
  );
}

export default App;
