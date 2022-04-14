import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  BridgeSourceNetworkSelect,
  BridgeMessage,
} from "../../../redux/actions/Bridge";
import BridgeModelsWrapper from "../BridgeModels.style";
import { BridgeSourceNetworkList } from "../../../assets/api/Bridge";

const BridgeSourceModel = ({ bridgeSourceModel, setBridgeSourceModel }) => {
  const dispatch = useDispatch();

  const BridgeSourceModelRemoveOverLay = (val) => {
    dispatch(BridgeSourceNetworkSelect(val));

    var Bridge_overlay = document.getElementById("Bridge_overlay");
    var Bridge_popup = document.getElementById("Bridge_popup");
    Bridge_popup.classList.remove("show");
    Bridge_overlay.classList.remove("show");

    setTimeout(() => {
      setBridgeSourceModel(false);
    }, 500);
  };

  useEffect(() => {
    if (bridgeSourceModel) {
      var Bridge_overlay = document.getElementById("Bridge_overlay");
      var Bridge_popup = document.getElementById("Bridge_popup");
      Bridge_popup.classList.add("show");
      Bridge_overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {bridgeSourceModel && (
        <BridgeModelsWrapper>
          <div id="Bridge_overlay" className="Bridge_overlay">
            <div className="Bridge" id="Bridge_popup">
              <div className="container-fluid Bridge_section">
                <div className="row d-flex align-items-center Bridge_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Select a Network</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setBridgeSourceModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row Bridge_bottom_Section">
                  <div className="col-12 mt-2">
                    <div className="network_list">
                      <div className="row" id="token_list">
                        {BridgeSourceNetworkList.map((val) => {
                          return (
                            <div className="col-12" key={val.id} id="tokens">
                              <div
                                className="details"
                                onClick={
                                  val.id === 1 || val.id === 2
                                    ? () => BridgeSourceModelRemoveOverLay(val)
                                    : () => dispatch(BridgeMessage())
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

export default BridgeSourceModel;
