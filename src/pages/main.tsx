import React from "react";
import Swap from "../components/Swap";
import SwapHeader from "../components/SwapHeader";

const Main = () => {
  return (
    <div className="main">
      <div className="swap-section">
        <SwapHeader />
        <Swap />
      </div>
    </div>
  );
};

export default Main;
