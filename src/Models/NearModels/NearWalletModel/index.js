import React, { useEffect } from "react";
import NearWalletModelWrapper from "./NearWalletModel.style";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { NearWallet } from "../../../Routes/NearRoute";

const NearWalletModel = ({ nearWalletModel, setNearWalletModel }) => {
  const { contract, nearConfig, wallet } = NearWallet();
  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setNearWalletModel(false);
    }, 400);
  };

  const signIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.addMessage.name],
      },
      "NEAR LP Finance",
      null,
      null
    );
  };

  useEffect(() => {
    if (nearWalletModel) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <>
      {nearWalletModel && (
        <>
          <NearWalletModelWrapper>
            <div className="popup">
              <div className="popup-container">
                <div className="near_wallet_wrapper">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-end">
                        <div className="close_near_wallet">
                          <AiOutlineCloseCircle
                            className="close_icon"
                            onClick={CloseModel}
                          />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center mt-4 pt-1">
                        <div className="near_wallet_title text-center d-flex flex-column">
                          <span>Select a NEAR wallet</span>
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                      <div className="col-11 mt-5">
                        <div className="wallet_card" onClick={signIn}>
                          <div className="img_section">
                            <img
                              src="/images/tokens/NearTokens/NEAR.png"
                              alt="Loading..."
                            />
                          </div>
                          <div className="wallet_title ml-3">
                            <p>NEAR (web)</p>
                            <span>wallet.near.org</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NearWalletModelWrapper>
        </>
      )}
    </>
  );
};

export default NearWalletModel;
