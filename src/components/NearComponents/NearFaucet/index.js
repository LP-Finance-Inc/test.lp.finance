import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FaucetWrapper from "../../../styles/Common/components/Faucet.style";
import { NearFaucetTokens } from "../../../assets/api/Near/NearFaucetApi";
import TokenModel from "../../../Models/Common/TokenModel";
import { NearFaucetTokenSelect } from "../../../redux/actions/Near/NearFaucetActions";

const NearFaucet = () => {
  const [NearFaucetModel, setNearFaucetModel] = useState(false);

  const NearFaucetState = useSelector((state) => state.NearFaucetReducer);

  useEffect(() => {
    const getTokenPriceList = async () => {
      return await fetch("https://indexer.ref-finance.net/list-token-price", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((list) => {
          console.log(list);
          return list;
        });
    };
    getTokenPriceList();
  }, []);

  return (
    <>
      {NearFaucetModel && (
        <TokenModel
          tokenModel={NearFaucetModel}
          setTokenModel={setNearFaucetModel}
          TokensApi={NearFaucetTokens}
          TokenSelectFun={NearFaucetTokenSelect}
        />
      )}

      <FaucetWrapper>
        <div className="container Faucet">
          <div className="Faucet_top">
            <div className="col-12">
              <div className="title text-center">
                <h1>LP Finance Faucet</h1>
              </div>
            </div>
          </div>
          <div className="row Faucet_bottom  d-flex align-items-center my-4">
            <div className="col-lg-6 col-12 text-center d-flex align-items-center flex-column">
              <div className="img_section">
                <img src="/images/factory.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-6 col-12 d-flex justify-content-center flex-column">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div className="token_sale_card">
                    <div className="title text-center">
                      <p>Get Tokens To Test!</p>
                    </div>
                    <div className="title text-center pt-2">
                      <span>Airdrop SOL before requesting other tokens</span>
                    </div>
                    <div className="row d-flex justify-content-center mt-4 pt-1">
                      <div className="col-lg-10 col-12">
                        <div className="box">
                          <div className="row mt-2 my-1">
                            <div className="col-lg-7 col-md-5 col-6 d-flex align-items-center">
                              <div className="number">
                                <p> {NearFaucetState.value}</p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-7 col-6 d-flex justify-content-end btn_section">
                              <button onClick={() => setNearFaucetModel(true)}>
                                <img
                                  src={NearFaucetState.img}
                                  alt="Loading..."
                                  height="29px"
                                  width="29px"
                                />
                                <span className="ml-lg-3 ml-md-3 ml-2">
                                  {NearFaucetState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="btn d-flex justify-content-center mt-4">
                          <button>
                            <span>Get</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FaucetWrapper>
    </>
  );
};

export default NearFaucet;
