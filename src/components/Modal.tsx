import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { getItem, setItem } from "../utils/localStorage";

type TokenListType = {
  name: string;
  id: string;
  usd: number;
};

const Modal = ({
  openModal,
  setOpenModal,
  isType,
  setDefaultBeforeSwap,
  setDefaultAfterSwap,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  isType: string;
  setDefaultBeforeSwap: (before: TokenListType) => void;
  setDefaultAfterSwap: (after: TokenListType) => void;
}) => {
  const tokenNameList: TokenListType[] = [
    {
      name: "ETH",
      id: "ethereum",
      usd: 0,
    },
    {
      name: "USDT",
      id: "tether",
      usd: 0,
    },
    {
      name: "USDC",
      id: "usd-coin",
      usd: 0,
    },
    {
      name: "DAI",
      id: "dai",
      usd: 0,
    },
    {
      name: "AAVE",
      id: "aave",
      usd: 0,
    },
    {
      name: "WBTC",
      id: "bitcoin",
      usd: 0,
    },
    {
      name: "AXS",
      id: "axie-infinity",
      usd: 0,
    },
    {
      name: "COMP",
      id: "compound-coin",
      usd: 0,
    },
    {
      name: "CRV",
      id: "curve-dao-token",
      usd: 0,
    },
    {
      name: "ENS",
      id: "ethereum-name-service",
      usd: 0,
    },
  ];

  const [tokenList, setTokenList] = useState<TokenListType[]>([]);
  const [tmpList, setTmpList] = useState<TokenListType[]>([]);

  useEffect(() => {
    getTokenAllList();
  }, []);

  async function getTokenAllList() {
    try {
      // const user = axios.get('https://graph.facebook.com/me');
      const res = await Promise.all(
        tokenNameList.map(async (params) => {
          return axios.get(
            `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${params.id}`
          );
        })
      );

      let newArray = [];
      for (const index in tokenNameList) {
        newArray.push({
          name: tokenNameList[index].name,
          id: tokenNameList[index].id,
          usd: res[index].data[tokenNameList[index].id].usd,
        });
      }

      setTokenList(newArray);
      setTmpList(newArray);
      return res;
    } catch (err) {}
  }

  const getTokenList = () => {
    const result: JSX.Element[] = [];

    if (tmpList.length !== 0) {
      tmpList.map((data: TokenListType) => {
        result.push(
          <button
            key={data.id}
            onClick={() => {
              if (isType !== "" && isType == "before") {
                setDefaultBeforeSwap(data);
              } else if (isType !== "" && isType == "after") {
                setDefaultAfterSwap(data);
              }
              // localStorage 저장
              let storage = getItem("tokens");
              let tokenArr = storage?.split(",");
              if (tokenArr) {
                if (!tokenArr.includes(data.name)) {
                  if (tokenArr?.length < 7 && tokenArr?.length > 0) {
                    let newArr = [...tokenArr, data.name];
                    setItem("tokens", newArr);
                  } else if (tokenArr?.length == 7) {
                    let newArr = [...tokenArr.slice(0, 6), data.name];
                    setItem("tokens", newArr);
                  }
                }
              }
              setOpenModal(false);
            }}
          >
            <div className="token-name">{data.name}</div>
            <div className="token-id">{data.id}</div>
          </button>
        );
      });
    } else {
      result.push(
        <div key={"empty-"} className="empty-token-list">
          검색 결과가 없습니다
        </div>
      );
    }
    return result;
  };

  const searchToken = (keyword: string) => {
    console.log(keyword);
    setTmpList(
      tokenList.filter(
        (token: TokenListType) =>
          token.name.includes(keyword) ||
          token.name.includes(keyword.toLocaleUpperCase())
      )
    );
  };

  const getLatestToken = () => {
    let storage = getItem("tokens");
    let tokenArr = storage?.split(",");
    let result: JSX.Element[] = [];
    if (tokenArr) {
      tokenArr?.forEach((tk) =>
        result.push(<div className="token-tag">{tk}</div>)
      );
    } else {
      return <div>토큰을 선택해주세요</div>;
    }
    return result;
  };

  return (
    <>
      <div className="modals-layout">
        <div className="modals-background">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            type="button"
            className="modals-close-button"
          >
            <AiOutlineClose className="modals-close-icon" />
          </button>
          <div className="modals-content-layout">
            <h3 className="messageTitle">토큰 선택</h3>
            <div>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  searchToken(e.target.value);
                }}
                className="token-search-input"
                placeholder="이름 검색 또는 주소 붙여 넣기"
              />
            </div>
            <div className="token-tags">{getLatestToken()}</div>
            <div className="token-list-wrapper">{getTokenList()}</div>
          </div>
          <div className="modal-footer">
            <button
              className="token-list-setting"
              onClick={() => alert("준비 중입니다")}
            >
              <HiOutlinePencilAlt />
              토큰 목록 관리
            </button>
          </div>
        </div>
      </div>
      <div className="modals-overlay"></div>
    </>
  );
};
export default Modal;
