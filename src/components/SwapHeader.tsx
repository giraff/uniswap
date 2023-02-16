import React from "react";
import { MdSettings } from "react-icons/md";

const SwapHeader = () => {
  return (
    <div className="swap-header">
      <div>스왑</div>
      <div>
        <MdSettings
          className="settings-icon"
          onClick={() => alert("준비 중입니다")}
        />
      </div>
    </div>
  );
};

export default SwapHeader;
