import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BridgeMessage } from "../../../redux/actions/global/BridgeActions";
import BridgeModelsWrapper from "../../../styles/Common/model/BridgeModels.style";

const BridgeModel = ({
  bridgeModel,
  setBridgeModel,
  BridgeSelectFun,
  BridgeApi,
}) => {
  const dispatch = useDispatch();

  const CloseBridgeModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setBridgeModel(false);
    }, 400);
  };

  const SelectBridgeNetwork = (val) => {
    dispatch(BridgeSelectFun(val));
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setBridgeModel(false);
    }, 400);
  };

  useEffect(() => {
    if (bridgeModel) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <>
      {bridgeModel && (
        <BridgeModelsWrapper>
          <div className="popup">
            <div className="popup-container">
              <div className="container-fluid Bridge_section">
                <div className="row d-flex align-items-center Bridge_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Select Network</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={CloseBridgeModel}
                      />
                    </div>
                  </div>
                </div>
                <div className="row Bridge_bottom_Section">
                  <div className="col-12 mt-2">
                    <div className="network_list">
                      <div className="row" id="token_list">
                        {BridgeApi.map((val) => {
                          return (
                            <div className="col-12" key={val.id} id="tokens">
                              <div
                                className="details"
                                onClick={
                                  val.id === 1 || val.id === 2
                                    ? () => SelectBridgeNetwork(val)
                                    : () =>
                                        dispatch(
                                          BridgeMessage(`Not supported yet`)
                                        )
                                }
                              >
                                <div className="row">
                                  <div className="col-12 d-flex align-items-center">
                                    <img
                                      src={val.img}
                                      alt="Loading..."
                                      height="29"
                                      width="29"
                                    />

                                    <div className="ml-3 details_name">
                                      <span
                                        style={
                                          val.id === 1 || val.id === 2
                                            ? { color: "white" }
                                            : { color: "#d6d6d6" }
                                        }
                                      >
                                        {val.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BridgeModelsWrapper>
      )}
    </>
  );
};

export default BridgeModel;
