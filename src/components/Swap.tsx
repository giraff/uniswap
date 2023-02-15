import React, { useState } from "react";
import { MdSettings } from "react-icons/md";
import { BsArrowDownShort } from "react-icons/bs";
import Modal from "./Modal";

const Swap = () => {
  const [defaultBeforeSwap, setDefaultBeforeSwap] = useState<string>("DAI");
  const [defaultAfterSwap, setDefaultAfterSwap] = useState<string>("USDC");

  const [beforeInput, setBeforeInput] = useState<string>("");
  const [afterInput, setAfterInput] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {openModal && <Modal />}
      <div className="swap-section">
        <div className="swap-header">
          <div>스왑</div>
          <div>
            <MdSettings
              className="settings-icon"
              onClick={() => alert("준비 중입니다")}
            />
          </div>
        </div>
        <div className="swap-contents">
          <div className="swap-input-wrapper">
            <div className="swap-input-main">
              <input
                className="swap-input"
                placeholder="0"
                value={beforeInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBeforeInput(e.target.value)
                }
              />
              <button className="modal-btn" onClick={() => setOpenModal(true)}>
                {defaultBeforeSwap}
              </button>
            </div>
            <div className="swap-input-footer">
              <div>{`$000`}</div>
            </div>
          </div>
          <div className="swap-arrow">
            <BsArrowDownShort className="swap-arrow-icon" />
          </div>
          <div className="swap-input-wrapper">
            <div className="swap-input-main">
              <input
                className="swap-input"
                placeholder="0"
                value={afterInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAfterInput(e.target.value)
                }
              />
              <button className="modal-btn" onClick={() => setOpenModal(true)}>
                {defaultAfterSwap}
              </button>
            </div>
            <div className="swap-input-footer">
              <div>{`$000`}</div>
            </div>
          </div>
        </div>
        <div className="swap-footer">
          <button
            disabled={beforeInput == "" || afterInput == ""}
            className="swap-button"
          >
            {beforeInput == "" || afterInput == ""
              ? `금액을 입력하세요`
              : `스왑`}
          </button>
        </div>
      </div>
    </>
  );
};

export default Swap;
