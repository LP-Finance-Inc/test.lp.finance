import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FaucetWrapper from "../../../styles/Common/components/Faucet.style";
import { useWallet } from "@solana/wallet-adapter-react";
import { request_faucet } from "../../../interfaces/Solana/SolFaucetContracts";
import ServerErrorIssue from "../../../Models/ServerErrorIssue";
import TokenModel from "../../../Models/Common/TokenModel";
import { FaucetTokenApi } from "../../../assets/api/Solana/SolFaucetApi";
import { FaucetTokenSelect } from "../../../redux/actions/Solana/SolFaucetActions";

const SolFaucet = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const FaucetTokenApiNew = FaucetTokenApi();
  const [serverErrorIssue, setServerErrorIssue] = useState(false);
  const dispatch = useDispatch();
  const [faucetModel, setFaucetModel] = useState(false);
  const SolFaucetState = useSelector((state) => state.SolFaucetReducer);
  const [FaucetMessage, setFaucetMessage] = useState("Get");

  const FaucetFunction = () => {
    if (publicKey) {
      if (SolFaucetState.img && SolFaucetState.value && SolFaucetState.name) {
        dispatch(
          request_faucet(SolFaucetState.name, wallet, SolFaucetState.value)
        );
      }
    } else {
      setFaucetMessage("Connect wallet");
    }
  };

  useEffect(() => {
    if (publicKey) {
      setFaucetMessage("Get");
    }
  }, [publicKey]);

  useEffect(() => {
    setTimeout(() => {
      setServerErrorIssue(true);
    }, 1000);
  }, []);

  return (
    <>
      {serverErrorIssue && (
        <ServerErrorIssue
          serverErrorIssue={serverErrorIssue}
          setServerErrorIssue={setServerErrorIssue}
        />
      )}

      {faucetModel && (
        <TokenModel
          tokenModel={faucetModel}
          setTokenModel={setFaucetModel}
          TokensApi={FaucetTokenApiNew}
          TokenSelectFun={FaucetTokenSelect}
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
                                <p>{SolFaucetState.value}</p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-7 col-6 d-flex justify-content-end btn_section">
                              <button onClick={() => setFaucetModel(true)}>
                                <img
                                  src={SolFaucetState.img}
                                  alt="Loading..."
                                  height="29px"
                                  width="29px"
                                />
                                <span className="ml-lg-3 ml-md-3 ml-2">
                                  {SolFaucetState.name}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="btn d-flex justify-content-center mt-4">
                          <button onClick={() => FaucetFunction()}>
                            <span>{FaucetMessage}</span>
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

export default SolFaucet;
