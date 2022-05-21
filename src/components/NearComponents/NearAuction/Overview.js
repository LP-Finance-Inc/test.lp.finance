import React from "react";

const Overview = () => {
  return (
    <>
      <div className="row py-lg-5 py-my-5 py-sm-3 py-3 d-flex justify-content-center Auction_overview_section">
        <div className="col-lg-10 col-md-12 col-12">
          <div className="row py-2">
            <div className="col-lg-5 col-md-6 col-sm-6 col-12">
              <div className="protocol_overview_title pl-lg-5 pl-md-5 pl-sm-5 pl-0">
                <p>Auction Pool Overview</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-12">
              <div className="protocol_overview_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center overview_section_card">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 d-flex justify-content-end">
              <div className="text-center bottom_arrow_img">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="borrow_card py-4">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-6 col-md-8 col-12 borrow_card_left mt-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                        <div className="borrow_cart">
                          <div className="pie animate no-round"></div>
                          <div className="totalSupplyPie">
                            <img
                              src="/images/figma/ellipse.png"
                              alt="Loading..."
                            />
                          </div>
                        </div>

                        <div className="miter1">
                          <p className="ml-5 pl-2">100%</p>
                          <img
                            src="/images/figma/cartLine1.png"
                            alt="Loading..."
                          />
                        </div>
                        <div className="miter2">
                          <p className="ml-4 pl-2">0%</p>
                          <img
                            src="/images/figma/cartLine2.png"
                            alt="loading..."
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
                        <div className="row py-lg-0 py-md-0 py-3 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-6 mt-lg-3 mt-md-3 mt-0">
                            <div className="cart_details ml-3">
                              <p>CBS Supply</p>
                              <span>$ 0</span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-6">
                            <div className="cart_details ml-3 mt-lg-4 mt-md-0 pt-lg-3 mt-md-3 mt-0">
                              <p>Liquidator Funds</p>
                              <span>$ 0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-8 col-12 borrow_card_right mt-lg-0 mt-md-4 mt-4 ">
                    <div className="list_section p-lg-3 p-md-2 p-0">
                      <table>
                        <tbody>
                          <tr>
                            <td>APY :</td>
                            <td className="list_section_right">0 %</td>
                          </tr>
                          <tr>
                            <td>Last Epoch Profit : </td>
                            <td className="list_section_right">$ 0</td>
                          </tr>
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
    </>
  );
};

export default Overview;
