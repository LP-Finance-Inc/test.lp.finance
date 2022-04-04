import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import ApricotFRWrapper from "./ApricotFR.style";
import { VscQuestion } from "react-icons/vsc";
import { DepositApr } from "../../../assets/api/BorrowApi";

const ApricotFR = ({ apricotFR, setApricotFR }) => {
  const removeOverLay = () => {
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    overlay.classList.remove("show");

    setTimeout(() => {
      setApricotFR(false);
    }, 500);
  };

  useEffect(() => {
    if (apricotFR) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {apricotFR && (
        <ApricotFRWrapper width="440px">
          <div id="overlay" className="ApricotFR_overlay">
            <div className="ApricotFR" id="popup">
              <div className="container-fluid ApricotFR_section">
                <div className="row d-flex align-items-center ApricotFR_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Apricot Finance Rates</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => removeOverLay()}
                      />
                    </div>
                  </div>
                </div>
                <div className="row ApricotFR_bottom_Section mt-4">
                  <div className="col-12">
                    <div className="table_card">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Asset</th>
                            <th scope="col" style={{ textAlign: "center" }}>
                              Deposit APR
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {DepositApr.map((list) => {
                            return (
                              <tr key={list.id}>
                                <td>
                                  <div className="d-flex align-items-center img_section">
                                    <img src={list.img} alt="Loading..." />
                                    <div className="token_name align-left ml-1">
                                      <p className="pl-2">{list.name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="APR_section d-flex align-items-center justify-content-center">
                                    <p>20% +</p>
                                    <img
                                      src="/images/APR.png"
                                      alt="Loading..."
                                      className="ml-2"
                                    />
                                    <div className="tooltip_section">
                                      <VscQuestion className="APR_icon ml-1" />
                                      <div className="APR_icon_tooltip">
                                        <ul>
                                          <li>
                                            <p>Deposit APR:</p>
                                            <span className="ml-2">
                                              3.09 plus
                                            </span>
                                          </li>
                                          <li className="mt-1">
                                            <p>APT APR:</p>
                                            <span className="ml-2">2%</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ApricotFRWrapper>
      )}
    </>
  );
};

export default ApricotFR;
