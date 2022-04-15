import React, { useState } from "react";
import LiquidateWrapper from "./Liquidate.style";
import { liquidate } from "../../lp_contracts/Auction";
import { useDispatch, useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { calc, numFormatter } from "../../helper";
import styled from "styled-components";
import DataLoader from "../DataLoader";

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

function sortByLTV(arr) {
  return arr.sort((a, b) => calc(b.LTV) - calc(a.LTV));
}

const Liquidate = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const dispatch = useDispatch();

  const lpAuctionState = useSelector(
    (state) => state.lpAuctionReducer.getLiquidateAccountList
  );

  const [pageNumber, setPageNumber] = useState(0);

  const [listPerPage] = useState(10);

  const pagesVisited = pageNumber * listPerPage;

  const pageCount = Math.ceil(
    lpAuctionState.AccountList &&
      lpAuctionState.AccountList.length / listPerPage
  );

  const shortArray = sortByLTV(lpAuctionState.AccountList);

  const displayList = shortArray.slice(
    pagesVisited,
    pagesVisited + listPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
  };

  return (
    <LiquidateWrapper>
      <div className="container liquidate">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12 liquidate_top">
            <div className="title text-center">
              <h2>Liquidate</h2>
              {/* <h3 className="mt-1">
                Help us keep the system healthy and earn rewards! Liquidate
                users that are below the collateral ratio and you will earn 0.5%
                of the collateral. The remaining is distributed to the Stability
                Pool providers.
              </h3> */}
            </div>
          </div>
        </div>
        <div
          className={
            shortArray.length > 0
              ? "row d-flex justify-content-center mt-5 mb-2"
              : "row d-flex justify-content-center mt-5 mb-5"
          }
        >
          <div className="col-lg-10 col-12 table_section">
            <div
              className="table_card"
              style={
                shortArray.length > 0
                  ? { minHeight: "auto" }
                  : { minHeight: "400px" }
              }
            >
              <table
                className={
                  shortArray.length > 0 ? "table table-hover" : "table"
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
                  {lpAuctionState.progress ? (
                    <tr>
                      <td>
                        <DataLoader />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {displayList?.length > 0 ? (
                        displayList.map((list, ind) => {
                          return (
                            <>
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
                                    disabled={
                                      calc(list.LTV) >= 94 ? false : true
                                    }
                                    onClick={() =>
                                      dispatch(liquidate(wallet, publicKey))
                                    }
                                    className="liquidate_btn"
                                  >
                                    Liquidate
                                    <div className="liquidate_btn_tooltip">
                                      <p>
                                        User is well collateralized, cannot
                                        liquidate. A user can be liquidated when
                                        their Collateral ratio goes below the
                                        Liquidation Ratio.
                                      </p>
                                    </div>
                                  </button>
                                </td>
                              </tr>
                            </>
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
        {shortArray && shortArray.length > 0 && (
          <div className="row pagination_div mt-1 d-flex justify-content-center">
            <div className="col-lg-10 col-12 d-flex justify-content-center">
              <ReactPaginate
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

export default Liquidate;
