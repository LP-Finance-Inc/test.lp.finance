import React, { useState } from "react";
import LiquidateWrapper from "./Liquidate.style";
import LiquidateListApi from "../../assets/api/LiquidateApi";
import { liquidate } from "../../lp_contracts/Auction";
import { useDispatch } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Liquidate = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  console.log(LiquidateListApi.length);
  const [pageNumber, setPageNumber] = useState(0);

  const [listPerPage] = useState(8);

  const pagesVisited = pageNumber * listPerPage;

  const pageCount = Math.ceil(LiquidateListApi.length / listPerPage);

  const displayList = LiquidateListApi.slice(
    pagesVisited,
    pagesVisited + listPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 550);
  };

  return (
    <LiquidateWrapper>
      <div className="container-fluid liquidate">
        <div className="row">
          <div className="col-12 liquidate_top">
            <div className="title">
              <h2>Liquidate</h2>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center my-5">
          <div className="col-lg-10 col-12 table_section">
            <div className="table_card table-responsive">
              <table class="table">
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
                  {displayList.map((list) => {
                    return (
                      <tr key={list.id}>
                        <td>
                          <p>{list.Debt}</p>
                        </td>
                        <td>
                          <p>{list.Collateral}</p>
                        </td>
                        <td>
                          <p>{`${list.Address.slice(
                            0,
                            4
                          )}...${list.Address.slice(40, 44)}`}</p>
                        </td>
                        <td>
                          <p>94%</p>
                        </td>
                        <td>
                          <div className="LTVPie_section">
                            <div className="LTVPie">
                              <p>{list.LTV}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button onClick={() => dispatch(liquidate(wallet))}>
                            Liquidate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row pagination_div mt-4 d-flex justify-content-center">
          <div className="col-lg-10 col-12 d-flex justify-content-end">
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
      </div>
    </LiquidateWrapper>
  );
};

export default Liquidate;
