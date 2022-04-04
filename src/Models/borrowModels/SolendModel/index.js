import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import SolendModelWrapper from "./SolendModel.style";
import { useSelector } from "react-redux";
import { AssetsSolendHeaderList } from "../../../assets/api/BorrowApi";
import { CalcTwoDigit } from "../../../helper";
import DataLoader from "../../../components/Loader/DataLoader";

const SolendModel = ({ solendModel, setSolendModel }) => {
  const PoolAssetsState = useSelector((state) => state.PoolAssetsReducer);

  const removeOverLay = () => {
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    overlay.classList.remove("show");

    setTimeout(() => {
      setSolendModel(false);
    }, 500);
  };

  useEffect(() => {
    if (solendModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {solendModel && (
        <SolendModelWrapper width="800px">
          <div id="overlay" className="ApricotFR_overlay">
            <div className="ApricotFR" id="popup">
              <div className="container-fluid ApricotFR_section">
                <div className="row d-flex align-items-center ApricotFR_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>Solend</p>
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
                      {PoolAssetsState.process ? (
                        <DataLoader
                          img="/images/LoaderSolend.png"
                          height="300px"
                        />
                      ) : (
                        <table className="table mt-4">
                          <thead>
                            <tr>
                              {AssetsSolendHeaderList.map((list) => {
                                return (
                                  <th scope="col" key={list.id}>
                                    {list.name}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {PoolAssetsState.PoolAssetsList &&
                              PoolAssetsState.PoolAssetsList.map((list) => {
                                return (
                                  <tr key={list.id}>
                                    <td>
                                      <div className="d-flex align-items-center table_list">
                                        <img src={list.img} alt="Loading..." />
                                        <div className="token_name pl-3">
                                          <p>{list.AssetsName}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="table_list">
                                        <p>{list.LTV}%</p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="table_list">
                                        <p>
                                          {list.TotalSupply} {list.AssetsName}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="table_list">
                                        <p>{CalcTwoDigit(list.SupplyAPY)}%</p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="table_list">
                                        <p>
                                          {list.TotalBorrowed} {list.AssetsName}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SolendModelWrapper>
      )}
    </>
  );
};

export default SolendModel;
