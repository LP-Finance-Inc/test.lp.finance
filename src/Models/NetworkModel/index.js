import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NetworkTokenSelect } from "../../redux/actions";
import NetworkModelWrapper from "./NetworkModel.style";
import { NetWorkTokenList } from "../../assets/api";

const NetworkModel = ({ networkModel, setNetworkModel }) => {
  const dispatch = useDispatch();

  const removeOverLay = (val) => {
    dispatch(NetworkTokenSelect(val));

    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    overlay.classList.remove("show");

    setTimeout(() => {
      setNetworkModel(false);
    }, 500);
  };

  useEffect(() => {
    if (networkModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {networkModel && (
        <NetworkModelWrapper>
          <div id="overlay" className="NetworkModel_overlay">
            <div className="NetworkModel" id="popup">
              <div className="container-fluid NetworkModel_section">
                <div className="row d-flex align-items-center NetworkModel_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Select a network</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setNetworkModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row NetworkModel_bottom_Section">
                  <div className="col-12 network_list">
                    <div className="row mt-3">
                      {NetWorkTokenList.map((list) => {
                        return (
                          <div className="col-12 mt-3">
                            <div
                              className="network_card"
                              onClick={() => removeOverLay(list)}
                            >
                              <div className="details d-flex justify-content-center">
                                <img src={list.img} alt="loading..." />
                                <p className="ml-3">{list.fullName}</p>
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
        </NetworkModelWrapper>
      )}
    </>
  );
};

export default NetworkModel;
