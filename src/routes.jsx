import { BrowserRouter, Routes, Route } from "react-router-dom";

import Checkout from "./pages/Checkout";

import Dashboard from "./pages/Dashboard";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
