import { useState } from "react";
import { useDispatch } from "react-redux";
import ShortSellTokenModel from "../../Models/shortSellModels/ShortSellTokenModel";
import { Message } from "../../redux/actions/Message";
import { TableApi } from "../../assets/api/ShortSellApis";
import { MessageAssets } from "../../redux/actions/Message";
import ShortSellWrapper from "./ShortSell.style";

const ShortSell = () => {
  const dispatch = useDispatch();
  const [shortSellTokenModel, setShortSellTokenModel] = useState(false);

  return (
    <>
      {shortSellTokenModel && (
        <ShortSellTokenModel
          shortSellTokenModel={shortSellTokenModel}
          setShortSellTokenModel={setShortSellTokenModel}
        />
      )}

      <ShortSellWrapper>
        <div className="container ShortSell">
          <div className="ShortSell_top">
            <div className="col-12">
              <div className="title text-center">
                <h1>Short Sell Cryptocurrencies</h1>
              </div>
            </div>
          </div>
          <div className="row ShortSell_section  d-flex align-items-center justify-content-center my-4">
            <div className="col-lg-6 col-md-9 col-12 text-center d-flex align-items-center flex-column ShortSell_section_left ">
              <div className="price_chart d-flex justify-content-center align-items-center">
                <p>Price Chart Coming Soon...</p>
              </div>
            </div>

            <div className="col-lg-6 col-12 d-flex justify-content-center flex-column ShortSell_section_right">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-9 col-md-9 col-12 d-flex align-items-center justify-content-center">
                  <div className="token_sale_card">
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-10 col-12">
                        <div className="row assets_Section d-flex align-items-center">
                          <div className="col-lg-6 col-md-6 col-4 assets_Section_left d-flex justify-content-start">
                            <img
                              src="/images/tokens/lpSOL.png"
                              alt="Loading..."
                              height="100"
                              width="100"
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-8 assets_Section_right d-flex justify-content-end">
                            <button onClick={() => dispatch(MessageAssets())}>
                              Select a Assets
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center mt-4">
                      <div className="col-lg-10 col-12">
                        <div className="box_data">
                          <div className="row mt-2 my-1">
                            <div className="col-lg-7 col-md-7 col-6 d-flex align-items-center number_section">
                              <span className="badge d-flex align-items-center">
                                MAX
                              </span>
                              <input
                                type="number"
                                placeholder="00.00"
                                autoComplete="off"
                                className="ml-2"
                              />
                            </div>
                            <div className="col-lg-5 col-md-5 col-6 d-flex justify-content-end btn_section">
                              <button>
                                <img
                                  src="/images/tokens/lpUSD.png"
                                  alt="Loading..."
                                  height="29"
                                  width="29"
                                />

                                <span className="ml-lg-3 ml-md-3 ml-2">
                                  lpUSD
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="btn d-flex justify-content-center mt-4">
                          <button onClick={() => dispatch(Message())}>
                            Open Short
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-center align-items-center mt-lg-5 ShortSell_account">
                <div className="col-lg-9 col-md-10 col-sm-11 col-12">
                  <div className="row my-3">
                    <div className="col-lg-6 col-md-5 col-sm-6 col-12">
                      <div className="Account_title pl-lg-0 pl-md-3 pl-sm-3 pl-0 ">
                        <p>Your Account</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-6 col-12">
                      <div className="right_arrow_img text-center">
                        <hr />
                        <img src="/images/diamond.png" alt="Loading..." />
                      </div>
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-12  d-flex justify-content-end">
                      <div className="bottom_arrow_img text-center">
                        <hr />
                        <img src="/images/diamond.png" alt="Loading..." />
                      </div>
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-11 col-12">
                      <div className="Account_section">
                        <div className="row">
                          <div className="col-12 account_details">
                            <table width="100%">
                              <tbody>
                                {TableApi.map((val, ind) => {
                                  return (
                                    <tr
                                      key={ind}
                                      style={
                                        val.css
                                          ? { borderBottom: val.css }
                                          : { borderBottom: "" }
                                      }
                                    >
                                      <td className="left">
                                        <p>{val.title}</p>
                                      </td>
                                      <td className="right">
                                        <p></p>
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
              </div>
            </div>
          </div>
        </div>
      </ShortSellWrapper>
    </>
  );
};

export default ShortSell;
