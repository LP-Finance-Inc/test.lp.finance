import React, { useState, useEffect } from "react";
import LiquidateWrapper from "../../../styles/Common/components/Liquidate.style";
import { liquidate } from "../../../interfaces/Solana/SolAuctionContracts";
import { useDispatch, useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { calc, numFormatter } from "../../../helper";
import styled from "styled-components";
import DataLoader from "../../globalComponents/DataLoader";
import { getLiquidateAccountListFun } from "../../../utils/Solana/SolLiquidateFun";

const LTVWrapper = styled.div`
  .LTVPie {
    position: relative;
    height: 30px;
    width: ${(props) => props.LTV}%;
    background: #8b4898;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
    cursor: pointer;

    ${(props) =>
      props.LTV >= 97
        ? `border-radius:10px;`
        : `border-radius: 10px 0px 0px 10px;`}

    p {
      font-size: 0.8rem;
    }
  }

  .LTVPie .LTVPie_tooltip {
    visibility: hidden;
    min-width: 150px;
    background: ${(props) => props.theme.tooltip.TooltipBg};
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 0.5rem 0.5rem;
    position: absolute;
    z-index: 1;
    bottom: 130%;
    left: 50%;
    font-size: 0.8rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .LTVPie .LTVPie_tooltip ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-bottom: 10px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.tooltip.TooltipColor} transparent
      transparent transparent;
  }
  .LTVPie:hover .LTVPie_tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const SolLiquidate = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();

  const SolAuctionState = useSelector((state) => state.SolAuctionReducer);

  const SolLiquidateState = useSelector((state) => state.SolLiquidateReducer);

  const [pageNumber, setPageNumber] = useState(0);

  const [listPerPage] = useState(10);

  const { AuctionLastEpochProfitAmount, AuctionTotalLpUSD } =
    SolAuctionState.AuctionStakeInfo;

  const { lpUSDTokenPrice } = SolAuctionState.TokenPriceList;

  const LiquidatorFunds = AuctionTotalLpUSD * lpUSDTokenPrice;

  const LastEpochProfit = AuctionLastEpochProfitAmount * lpUSDTokenPrice;

  const pagesVisited = pageNumber * listPerPage;

  const pageCount = Math.ceil(SolLiquidateState.count / listPerPage);

  const displayList = SolLiquidateState?.List?.slice(
    pagesVisited,
    pagesVisited + listPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  const LiquidateFun = (address, Debt, Collateral, LTV) => {
    dispatch(
      liquidate(
        wallet,
        address,
        Debt,
        Collateral,
        LTV,
        LiquidatorFunds,
        LastEpochProfit
      )
    );
  };

  useEffect(() => {
    dispatch(getLiquidateAccountListFun(publicKey, pageNumber, listPerPage));
  }, [publicKey, pageNumber]);

  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(getLiquidateAccountListFun(publicKey, pageNumber, listPerPage));
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  }, [publicKey]);

  return (
    <LiquidateWrapper>
      <div className="container liquidate">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12 liquidate_top">
            <div className="title text-center">
              <h2>Liquidate</h2>
            </div>
          </div>
        </div>
        <div
          className={
            SolLiquidateState.count > 0
              ? "row d-flex justify-content-center mt-5 mb-2"
              : "row d-flex justify-content-center mt-5 mb-5"
          }
        >
          <div className="col-lg-10 col-12 table_section">
            <div
              className="table_card"
              style={
                SolLiquidateState.count > 0
                  ? { minHeight: "auto" }
                  : { minHeight: "400px" }
              }
            >
              <table
                className={
                  SolLiquidateState.count > 0 ? "table table-hover" : "table"
                }
              >
                <thead>
                  <tr>
                    <th scope="col">Debt</th>
                    <th scope="col">Collateral</th>
                    <th scope="col">Address</th>
                    <th scope="col">LR (%)</th>
                    <th scope="col">LTV (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {SolLiquidateState.progress ? (
                    <div style={{ height: "400px" }}>
                      <DataLoader />
                    </div>
                  ) : (
                    <>
                      {SolLiquidateState.count > 0 ? (
                        displayList.map((list, ind) => {
                          return (
                            <tr key={ind}>
                              <td>
                                <p>$ {numFormatter(list.Debt)}</p>
                              </td>
                              <td>
                                <p>$ {numFormatter(list.Collateral)}</p>
                              </td>
                              <td>
                                <p>{`${list.address.slice(
                                  0,
                                  4
                                )}...${list.address.slice(40, 44)}`}</p>
                              </td>
                              <td>
                                <p>94%</p>
                              </td>
                              <td>
                                <div className="LTVPie_section">
                                  <LTVWrapper LTV={calc(list.LTV)}>
                                    <div className="LTVPie">
                                      <p>{calc(list.LTV)}%</p>
                                      <div className="LTVPie_tooltip">
                                        <p>LTV: {calc(list.LTV)}%</p>
                                      </div>
                                    </div>
                                  </LTVWrapper>
                                  <div className="Threshold">
                                    <div className="Threshold_tooltip">
                                      <p>Liquidation Threshold: 94%</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <button
                                  disabled={calc(list.LTV) >= 94 ? false : true}
                                  onClick={() =>
                                    LiquidateFun(
                                      list.address,
                                      list.Debt,
                                      list.Collateral,
                                      `${calc(list.LTV)}%`
                                    )
                                  }
                                  className="liquidate_btn"
                                >
                                  Liquidate
                                  {calc(list.LTV) >= 94 ? (
                                    ""
                                  ) : (
                                    <div className="liquidate_btn_tooltip">
                                      <p>
                                        User is well collateralized, cannot
                                        liquidate. A user can be liquidated when
                                        their Collateral ratio goes below the
                                        Liquidation Ratio.
                                      </p>
                                    </div>
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="row">
                          <div className="col-12 NoList">
                            <div className="message">
                              <span>No Positions in Liquidation Risk</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {publicKey && displayList.length > 0 && (
          <div className="row pagination_div d-flex justify-content-center">
            <div className="col-lg-10 col-12 d-flex justify-content-center">
              <ReactPaginate
                forcePage={pageNumber}
                previousLabel={<MdOutlineKeyboardArrowLeft />}
                nextLabel={<MdOutlineKeyboardArrowRight />}
                pageCount={pageCount}
                breakLabel={"..."}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                onPageChange={changePage}
                containerClassName={"paginationBtn"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        )}
      </div>
    </LiquidateWrapper>
  );
};

export default SolLiquidate;
