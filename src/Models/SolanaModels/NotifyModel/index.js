import React, { useEffect } from "react";
import NotifyModelWrapper from "./NotifyModel.style";
import { RiCloseCircleLine } from "react-icons/ri";
import Notify from "../../../components/SolanaComponents/Notify";

const NotifyModel = ({ notifyModel, setNotifyModel }) => {
  const CloseTokenModel = () => {
    document.querySelector(".notify_popup").classList.remove("active");
    setTimeout(() => {
      setNotifyModel(false);
    }, 400);
  };

  useEffect(() => {
    if (notifyModel) {
      document.querySelector(".notify_popup").classList.add("active");
    }
  }, []);

  return (
    <NotifyModelWrapper>
      <div className="notify_popup">
        <div className="notify_popup_container">
          <div className="container-fluid Model_section">
            <div className="row d-flex align-items-center Model_top_Section pb-2">
              <div className="col-lg-8 col-10">
                <div className="title">
                  <p>Get Notification</p>
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
            <div className="row Model_bottom_Section mt-4">
              <Notify />
            </div>
          </div>
        </div>
      </div>
    </NotifyModelWrapper>
  );
};

export default NotifyModel;
