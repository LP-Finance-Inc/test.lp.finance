import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import { calc, numFormatter } from "../../../helper";

const Account = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    DepositedBtcAmount,
    DepositedSolAmount,
    DepositedUsdcAmount,
    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedMSOLAmount,
  } = lpContractState.UserAccountInfo;

  const {
    DepositedUserSOLAmountCal,
    DepositedUserBTCAmountCal,
    DepositedUserUSDCAmountCal,
    DepositedUserLpUSDAmountCal,
    DepositedUserLpSOLAmountCal,
    DepositedUserMSOLAmountCal,
    BorrowedUserLpUSDAmountCal,
    BorrowedUserLpSOLAmountCal,
  } = lpContractState.variables;

  const Table = [
    {
      id: 1,
      title: "Collateral",
      TotalCollateral:
        publicKey &&
        numFormatter(lpContractState.variables.UserTotalDepositedCal),
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 2,
          Bal: DepositedBtcAmount,
          name: "tBTC",
          img: "/images/tokens/BTC.png",
          TokenPrice: numFormatter(DepositedUserBTCAmountCal),
        },
        {
          id: 3,
          Bal: DepositedSolAmount,
          name: "SOL",
          img: "/images/tokens/SOL.png",
          TokenPrice: numFormatter(DepositedUserSOLAmountCal),
        },
        {
          id: 4,
          Bal: DepositedUsdcAmount,
          name: "tUSDC",
          img: "/images/tokens/USDC.png",
          TokenPrice: numFormatter(DepositedUserUSDCAmountCal),
        },
        {
          id: 5,
          Bal: DepositedLpSolAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: numFormatter(DepositedUserLpSOLAmountCal),
        },
        {
          id: 6,
          Bal: DepositedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: numFormatter(DepositedUserLpUSDAmountCal),
        },
        {
          id: 7,
          Bal: DepositedMSOLAmount,
          name: "tmSOL",
          img: "/images/tokens/mSOL.png",
          TokenPrice: numFormatter(DepositedUserMSOLAmountCal),
        },
      ],
    },
    {
      id: 8,
      title: "Borrowed",
      TotalBorrowed:
        publicKey &&
        numFormatter(lpContractState.variables.UserTotalBorrowedCal),
      price: "0",
      css: "3px solid #FFFFFF80",
      userInfo: [
        {
          id: 9,
          Bal: BorrowedLpSOLAmount,
          name: "lpSOL",
          img: "/images/tokens/lpSOL.png",
          TokenPrice: numFormatter(BorrowedUserLpSOLAmountCal),
        },
        {
          id: 10,
          Bal: BorrowedLpUsdAmount,
          name: "lpUSD",
          img: "/images/tokens/lpUSD.png",
          TokenPrice: numFormatter(BorrowedUserLpUSDAmountCal),
        },
      ],
    },
    {
      id: 12,
      title: "Borrow Limit",
      price: `$ ${numFormatter(lpContractState.Borrow.Account.BorrowLimit)}`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 13,
      title: "Liquidation Threshold",
      price: `$ ${numFormatter(lpContractState.Borrow.Account.Liquidation)}`,
      css: "3px solid #FFFFFF80",
    },
    {
      id: 14,
      title: "LTV",
      price:
        lpContractState.Borrow.Account.LTV >= 0
          ? `${calc(lpContractState.Borrow.Account.LTV)} %`
          : "0 %",
    },
  ];

  return (
    <>
      <div className="row d-flex justify-content-center borrow_Account mt-lg-0 mt-5">
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
          <div className="row my-2">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <div className="Account_title pl-1 pl-md-1 pl-sm-1 pl-0">
                <p>Your Account</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-12">
              <div className="right_arrow_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 d-flex justify-content-end">
              <div className=" bottom_arrow_img text-center justify-content-end">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="Account_card">
                <div className="row">
                  <div className="col-12 mt-3">
                    <div className="chart_miters">
                      <div className="pie1">
                        <span className="pie1_tooltip">
                          Borrowed:
                          <br />${" "}
                          {publicKey &&
                            calc(
                              lpContractState.variables.UserTotalBorrowedCal
                            )}{" "}
                          ( {calc(lpContractState.Borrow.Account.LTV)}% )
                        </span>
                      </div>
                      <div className="pie2">
                        <span className="pie2_tooltip">
                          {" "}
                          Liquidation Threshold : 94%
                        </span>
                      </div>
                      <div className="pie3">
                        <span className="pie3_tooltip">Borrow Limit: 85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <table width="100%" className="mt-3">
                  <tbody>
                    {Table.map((val, ind) => {
                      return (
                        <tr
                          key={val.id}
                          style={
                            val.css
                              ? { borderBottom: val.css }
                              : { borderBottom: "" }
                          }
                          className={
                            val.id === 1 && publicKey
                              ? "Collateral_tooltip"
                              : "table_row"
                          }
                        >
                          <td className="left">
                            <p>{val.title}</p>
                            {val.TotalCollateral && (
                              <span>$ {val.TotalCollateral} </span>
                            )}
                            {val.TotalBorrowed && (
                              <span>$ {val.TotalBorrowed} </span>
                            )}
                          </td>
                          <td className="right text-right">
                            {ind === 0 || ind === 1 ? (
                              <>
                                {val.userInfo.map((list) => {
                                  return (
                                    <>
                                      {list.Bal > 0 && (
                                        <div
                                          className={
                                            list.id === 1
                                              ? "row mt-1"
                                              : "row mt-3"
                                          }
                                          key={list.id}
                                        >
                                          <div className="col-12 Collateral_list d-flex justify-content-end flex-column">
                                            <div className="row">
                                              <div className="col-12 Collateral_list_details mr-2 d-flex align-items-center justify-content-end">
                                                <p>{calc(list.Bal)}</p>
                                                <span className="ml-1">
                                                  {list.name}
                                                </span>
                                                <img
                                                  src={list.img}
                                                  alt="Loading..."
                                                  className="ml-2"
                                                />
                                              </div>

                                              <div className=" col-12 mt-1 Collateral_list_Price d-flex justify-content-end flex-column align-items-end">
                                                <p>$ {list.TokenPrice}</p>
                                              </div>
                                              {ind === 0 && (
                                                <div className=" col-12 mt-1 Collateral_list_APY d-flex justify-content-end flex-column align-items-end">
                                                  <p>
                                                    {list.name} Reward APY: 0%
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <>{publicKey && <p>{val.price}</p>}</>
                            )}
                          </td>
                          {val.id === 1 && publicKey && (
                            <td className="Collateral_tooltip_content">
                              <p>Supply Reward is not available on Devnet</p>
                            </td>
                          )}
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
    </>
  );
};

export default Account;
