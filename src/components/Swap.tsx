import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsArrowDownShort } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import Modal from "./Modal";
import { getItem, setItem } from "../utils/localStorage";
import axios from "axios";

export type TokenListType = {
  name: string;
  id: string;
  usd: number;
};

const Swap = () => {
  const [defaultBeforeSwap, setDefaultBeforeSwap] = useState<TokenListType>({
    name: "",
    id: "",
    usd: 0,
  });
  const [defaultAfterSwap, setDefaultAfterSwap] = useState<TokenListType>({
    name: "",
    id: "",
    usd: 0,
  });

  const [currentUsd, setCurrentUsd] = useState<number>(0);

  const [beforeInput, setBeforeInput] = useState<string | number>("");
  const [afterInput, setAfterInput] = useState<string | number>("");
  const [isType, setIsType] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  /**
   * 가장 기본 토큰 (DAI, USDC만) 개별 정보 가져오기
   */
  async function setDefaultToken() {
    try {
      const res = await Promise.all(
        ["dai", "usd-coin"].map(async (params) => {
          return axios.get(
            `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${params}`
          );
        })
      );

      let beforeTmp: TokenListType = {
        name: "DAI",
        id: "dai",
        usd: res[0].data["dai"].usd,
      };
      let afterTmp: TokenListType = {
        name: "USDC",
        id: "usd-coin",
        usd: res[1].data["usd-coin"].usd,
      };

      setDefaultBeforeSwap(beforeTmp);
      setDefaultAfterSwap(afterTmp);

      setItem("tokens", ["DAI", "USDC"]);
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * useEffect
   */
  useEffect(() => {
    setDefaultToken();
  }, []);

  useEffect(() => {
    // 이전 토큰 변경
    if (defaultAfterSwap.usd !== 0 && defaultBeforeSwap.usd !== 0) {
      BeforeCalculator(beforeInput);
    }
  }, [defaultBeforeSwap]);

  useEffect(() => {
    if (defaultAfterSwap.usd !== 0 && defaultBeforeSwap.usd !== 0)
      AfterCalculator(afterInput);
  }, [defaultAfterSwap]);

  /**
   * 입력 예외 처리
   * @param e
   * @returns
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let evalue = e.target.value;
    let pattern1 = /(^\d+$)|(^\d{1,}[.]\d{0,10}$)/;
    if (evalue == "") {
      return true;
    }
    if (!evalue.includes(".") && Number(evalue) == 0 && evalue.length > 1) {
      return false;
    } else if (evalue.split(".").length > 2) {
      return false;
    } else if (!pattern1.test(evalue)) {
      return false;
    } else if (Number.isNaN(parseInt(evalue))) {
      return false;
    }
    return true;
  };

  /**
   * 위 토큰 계산 함수
   * @param beforeCnt
   */
  const BeforeCalculator = (beforeCnt: any) => {
    let cntusd = parseFloat((beforeCnt * defaultBeforeSwap?.usd).toFixed(10));
    // currentUsd 설정 (beforeCnt * defaultBeforeSwap.usd)
    setCurrentUsd(cntusd);
    // afterInput 설정 (currentUsd 구매가격 /defaultAfterSwap.usd (1개당 달러))
    let newAfterInput = parseFloat((cntusd / defaultAfterSwap.usd).toFixed(10));
    setAfterInput(newAfterInput == 0 ? "" : newAfterInput);
  };

  /**
   * 아래 토큰 계산 함수
   * @param afterCnt
   */
  const AfterCalculator = (afterCnt: any) => {
    let cntusd = parseFloat((afterCnt * defaultAfterSwap?.usd).toFixed(10));
    // currentUsd 설정 (beforeCnt * defaultBeforeSwap.usd)
    setCurrentUsd(cntusd);

    let newBeforeInput = parseFloat(
      (cntusd / defaultBeforeSwap.usd).toFixed(10)
    );

    setBeforeInput(newBeforeInput == 0 ? "" : newBeforeInput);
  };

  /**
   * 1 (위 토큰)에 비교한 상대 갯수
   * @returns
   */
  const getSwapRelative = () => {
    return ((beforeInput as number) / (afterInput as number)).toFixed(10);
  };

  return (
    <>
      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          isType={isType}
          defaultBeforeSwap={defaultBeforeSwap}
          defaultAfterSwap={defaultAfterSwap}
          setDefaultBeforeSwap={setDefaultBeforeSwap}
          setDefaultAfterSwap={setDefaultAfterSwap}
        />
      )}

      <div className="swap-contents">
        <div className="swap-input-wrapper">
          <div className="swap-input-main">
            <input
              type="text"
              className="swap-input"
              placeholder="0"
              value={beforeInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (handleInput(e)) {
                  setBeforeInput(e.target.value);
                  BeforeCalculator(e.target.value);
                }
              }}
            />
            <button
              className="modal-btn"
              onClick={() => {
                setIsType("before");
                setOpenModal(true);
              }}
            >
              {defaultBeforeSwap?.name}
              <MdKeyboardArrowDown />
            </button>
          </div>
          {currentUsd == 0 ? (
            <></>
          ) : (
            <div className="swap-input-footer">
              <div>{`$${currentUsd}`}</div>
            </div>
          )}
        </div>
        <div className="swap-arrow">
          <BsArrowDownShort className="swap-arrow-icon" />
        </div>
        <div className="swap-input-wrapper">
          <div className="swap-input-main">
            <input
              type="text"
              className="swap-input"
              min={0}
              placeholder="0"
              value={afterInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (handleInput(e)) {
                  setAfterInput(e.target.value);
                  AfterCalculator(e.target.value);
                }
              }}
            />
            <button
              className="modal-btn"
              onClick={() => {
                setIsType("after");
                setOpenModal(true);
              }}
            >
              {defaultAfterSwap?.name}
              <MdKeyboardArrowDown />
            </button>
          </div>
          {currentUsd == 0 ? (
            <></>
          ) : (
            <div className="swap-input-footer">
              <div>{`$${currentUsd}`}</div>
            </div>
          )}
        </div>
      </div>
      {afterInput == "" || Number(afterInput) == 0 ? (
        <></>
      ) : (
        <div className="swap-result-wrapper">
          <div className="swap-result">
            <RiErrorWarningLine className="swap-result-icon" />
            <div>
              {`1 ${defaultAfterSwap?.name} = ${getSwapRelative()} ${
                defaultBeforeSwap?.name
              } `}
            </div>
            <div className="dollar-text">{` ($${defaultAfterSwap?.usd})`}</div>
          </div>
        </div>
      )}
      <div className="swap-footer">
        <button
          disabled={beforeInput == "" || afterInput == ""}
          className="swap-button"
          onClick={() => alert("준비 중입니다")}
        >
          {beforeInput == "" || afterInput == "" ? `금액을 입력하세요` : `스왑`}
        </button>
      </div>
    </>
  );
};

export default Swap;
