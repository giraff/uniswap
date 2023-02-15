import React, { useEffect, useState } from "react";
import axios from "axios";

type TokenListType = {
  name: string;
  id: string;
  usd: string | number;
};

const Modal = () => {
  const tokenNameList: TokenListType[] = [
    {
      name: "ETH",
      id: "ethereum",
      usd: "",
    },
    {
      name: "USDT",
      id: "tether",
      usd: "",
    },
    {
      name: "USDC",
      id: "usd-coin",
      usd: "",
    },
    {
      name: "DAI",
      id: "dai",
      usd: "",
    },
    {
      name: "AAVE",
      id: "aave",
      usd: "",
    },
    {
      name: "WBTC",
      id: "bitcoin",
      usd: "",
    },
    {
      name: "AXS",
      id: "axie-infinity",
      usd: "",
    },
    {
      name: "COMP",
      id: "compound-coin",
      usd: "",
    },
    {
      name: "CRV",
      id: "curve-dao-token",
      usd: "",
    },
    {
      name: "ENS",
      id: "ethereum-name-service",
      usd: "",
    },
  ];

  const [tokenList, setTokenList] = useState<TokenListType[]>([]);

  useEffect(() => {
    getfbProfile();
  }, []);

  async function getfbProfile() {
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
        console.log(
          tokenNameList[index].name,
          tokenNameList[index].id,
          res[index].data[tokenNameList[index].id].usd
        );
        newArray.push({
          name: tokenNameList[index].name,
          id: tokenNameList[index].id,
          usd: res[index].data[tokenNameList[index].id].usd,
        });
      }

      setTokenList(newArray);
      return res;
    } catch (err) {}
  }

  const getTokenList = () => {
    const result: JSX.Element[] = [];

    tokenList.map((data: TokenListType) => {
      result.push(
        <div key={data.id}>
          <div>{data.name}</div>
          <div>{data.usd}</div>
        </div>
      );
    });
    return result;
  };

  return (
    <>
      <div className="modals-layout">
        <div className="modals-background">
          <div className="modals-content-layout">
            <h3 className="messageTitle"></h3>
            <div className="messageContext">{getTokenList()}</div>
          </div>
        </div>
      </div>
      <div className="modals-overlay"></div>
    </>
  );
};
export default Modal;
