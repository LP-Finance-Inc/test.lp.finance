import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import ApricotFRWrapper from "./ApricotFR.style";
import { VscQuestion } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AssetsMarketHeaderList } from "../../../assets/api/BorrowApi";
import { numFormatter, calc } from "../../../helper";
import DataLoader from "../../../components/Loader/DataLoader";

const ApricotFR = ({ apricotFR, setApricotFR }) => {
  const getAssetsMarketState = useSelector(
    (state) => state.getAssetsMarketReducer
  );

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
        <ApricotFRWrapper width="650px">
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
                <div className="row ApricotFR_bottom_Section mt-3">
                  <div className="col-12">
                    <div className="Table_card table-responsive-sm">
                      {getAssetsMarketState.progress ? (
                        <DataLoader img="/images/Loader.png" height="300px" />
                      ) : (
                        <table className="table mt-4">
                          <thead>
                            <tr>
                              {AssetsMarketHeaderList.map((list) => {
                                return (
                                  <th scope="col" key={list.id}>
                                    {list.name}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {getAssetsMarketState.AssetsMarketList &&
                              getAssetsMarketState.AssetsMarketList.map(
                                (list) => {
                                  return (
                                    <tr key={list.id}>
                                      <td>
                                        <div className="d-flex align-items-center table_list">
                                          <img
                                            src={list.img}
                                            alt="Loading..."
                                          />
                                          <div className="token_name pl-3">
                                            <p>{list.AssetsName}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="table_list">
                                          <p>
                                            {numFormatter(list.MarketDeposited)}
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="table_list">
                                          <p>
                                            {numFormatter(list.MarketBorrowed)}
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="table_list d-flex align-items-center">
                                          <p>{calc(list.DepositAPR)}%</p>
                                          <div className="DepositAPR_card ml-2">
                                            <VscQuestion className="DepositAPR_icon" />
                                            <div className="DepositAPR_card_tool">
                                              <ul>
                                                <li>Deposit APR: 20% plus</li>
                                                <li>APT APR: 2.4%</li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      )}
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
