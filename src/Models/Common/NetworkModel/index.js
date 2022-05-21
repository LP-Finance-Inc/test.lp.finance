import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NetworkTokenSelect } from "../../../redux/actions";
import NetworkModelWrapper from "../../../styles/Common/model/NetworkModel.style";
import { NetWorkList } from "../../../assets/api/global/NetworkApi";
import { NetworkAuth } from "../../../Context/global/NetworkContext";
import { BridgeMessage } from "../../../redux/actions/global/BridgeActions";

const NetworkModel = ({ networkModel, setNetworkModel }) => {
  const { SwitchNetwork } = NetworkAuth();
  const dispatch = useDispatch();

  const CloseTokenModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setNetworkModel(false);
    }, 400);
  };

  const SelectNetwork = (val) => {
    dispatch(NetworkTokenSelect(val));
    dispatch(SwitchNetwork(val.fullName));

    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setNetworkModel(false);
    }, 400);
  };

  useEffect(() => {
    if (networkModel) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <>
      {networkModel && (
        <NetworkModelWrapper>
          <div className="popup">
            <div className="popup-container">
              <div className="container-fluid NetworkModel_section">
                <div className="row d-flex align-items-center NetworkModel_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Select Network</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={CloseTokenModel}
                      />
                    </div>
                  </div>
                </div>
                <div className="row NetworkModel_bottom_Section">
                  <div className="col-12 network_list">
                    <div className="row mt-3">
                      {NetWorkList.map((list, ind) => {
                        return (
                          <div className="col-12 mt-3" key={ind}>
                            <div
                              className="network_card"
                              onClick={
                                list.id === 1 || list.id === 2
                                  ? () => SelectNetwork(list)
                                  : () =>
                                      dispatch(
                                        BridgeMessage(
                                          `${list.fullName} not supported yet`
                                        )
                                      )
                              }
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
