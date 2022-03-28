import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import ProtocolWrapper from "../../Protocol.style";
import { calc, CalcOneDigit, numFormatter } from "../../../helper";
import { useDispatch, useSelector } from "react-redux";
import { VoteFun } from "../../../redux/actions/CBS_DAO";
import { Chart, registerables, ArcElement } from "chart.js";
import { useWallet } from "@solana/wallet-adapter-react";
Chart.register(...registerables);
Chart.register(ArcElement);

const DAOModel = ({ daOModel, setDAOModel }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [vote, setVote] = useState();
  const [Loading, setLoading] = useState(false);
  const [voteMessage, setVoteMessage] = useState("Submit");

  const getVotePer = (e) => {
    setVote(e.target.value);
  };

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const DAOState = useSelector((state) => state.DAOReducer);

  const { lpUSDBorrowedPercentage, lpSOLBorrowedPercentage } =
    lpContractState.Borrow.pieChart.TotalSupply;

  const { TotalBorrowLpSOL, TotalBorrowLpUSD } =
    lpContractState.UserStateAccountInfo;

  const { BorrowedLpUSDAmountCal, BorrowedLpSOLAmountCal } =
    lpContractState.variables;

  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLBorrowedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDBorrowedPercentage);

  const TotalSupply = lpContractState.Borrow.Overview.TotalSupply;
  const UserCollateral = lpContractState.variables.UserTotalDepositedCal;

  // Your Share: (User Collateral / Total Supply) * 100%
  const YourShare = (UserCollateral / TotalSupply) * 100;

  const voteAction = (e) => {
    e.preventDefault();
    if (publicKey) {
      setVoteMessage("Submit");
      dispatch(VoteFun(YourShare, vote, setVote, setLoading, publicKey));
    } else {
      setVoteMessage("Connect wallet");
    }
  };

  const BorrowDAOPieChartLegend = [
    {
      id: 1,
      name: "lpSOL",
      bg: "#e600b4",
      img: "/images/tokens/SLND.png",
      price: numFormatter(BorrowedLpSOLAmountCal),
    },
    {
      id: 2,
      name: "lpUSD",
      bg: "#3900e6",
      img: "/images/tokens/APT.png",
      price: numFormatter(BorrowedLpUSDAmountCal),
    },
  ];

  useEffect(() => {
    if (daOModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }

    const updateChart = () => {
      const type = "doughnut";

      new Chart("DAO_pie_chart", {
        type: type,
        data: {
          labels: [
            {
              name: "lpSOL",
              per: lpSOL_PERCENTAGE,
              price: calc(TotalBorrowLpSOL),
            },
            {
              name: "lpUSD",
              per: lpUSD_PERCENTAGE,
              price: calc(TotalBorrowLpUSD),
            },
          ],
          datasets: [
            {
              label: "Total Borrowed",
              data: [lpSOL_PERCENTAGE, lpUSD_PERCENTAGE],
              backgroundColor: ["#e600b4", "#3900e6"],
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              yAlign: "bottom",
              callbacks: {
                label: (context) => {
                  return ` ${context.label.price} ${context.label.name} (${context.label.per}%)`;
                },
              },
            },
          },
          scales: {
            ticks: {
              display: false,
            },
          },
        },
      });
    };

    updateChart();

    setInterval(() => {
      updateChart();
    }, 30000);
  }, []);

  useEffect(() => {
    if (publicKey) {
      setVoteMessage("Submit");
    }
  }, [publicKey]);

  return (
    <>
      {daOModel && (
        <ProtocolWrapper width="1000px">
          <div id="overlay" className="Protocol_overlay">
            <div className="ProtocolModel" id="popup">
              <div className="container-fluid Protocol_section">
                <div className="row d-flex align-items-center Protocol_top_Section pb-2">
                  <div className="col-lg-8 col-10">
                    <div className="title">
                      <p>CBS DAO</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setDAOModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row Protocol_bottom_Section my-3 d-flex justify-content-center align-items-center">
                  <div className="col-lg-5 col-12 d-flex justify-content-center flex-column mt-3 legend">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <canvas id="DAO_pie_chart" width="250"></canvas>
                      </div>
                    </div>

                    <div className="row legend_list d-flex justify-content-center">
                      {BorrowDAOPieChartLegend.map((list) => {
                        return (
                          <div
                            className="col-8 mt-lg-3 mt-md-0 mt-3"
                            key={list.id}
                          >
                            <div
                              className="legend_card d-flex align-items-center"
                              style={{ backgroundColor: list.bg }}
                            >
                              <div>
                                <img src={list.img} alt="Loading..." />
                              </div>
                              <div className="d-flex mt-1 align-items-center">
                                <p className="ml-2">{list.name}</p>
                                <span className="pl-2"> $ {list.price}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-7 col-12">
                    <div className="row vote_Section d-flex  justify-content-center">
                      <div className="col-12 d-flex justify-content-center">
                        <div className="vote_Section_title">
                          <p>Vote</p>
                        </div>
                      </div>
                      <div className="col-12 mt-2 d-flex justify-content-center">
                        <div className="vote_Section_card">
                          <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                              <div className="vote_Section_card_title">
                                <p>Overflow Ratio</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-5 pt-3">
                            <div className="col-6 d-flex justify-content-center flex-column">
                              <form method="POST" onSubmit={voteAction}>
                                <div className="input_Card">
                                  <input
                                    type="text"
                                    placeholder="00.00"
                                    value={vote}
                                    onChange={getVotePer}
                                    required
                                  />
                                </div>
                                <div className="btn_Section d-flex justify-content-center mt-3">
                                  <button type="submit" disabled={Loading}>
                                    {Loading ? (
                                      <p
                                        style={{
                                          color: "snow",
                                          fontSize: "1.5rem",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItem: "center",
                                        }}
                                      >
                                        <i className="zmdi zmdi-rotate-left zmdi-hc-spin-reverse"></i>
                                      </p>
                                    ) : (
                                      `${voteMessage}`
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                            <div className="col-6 vote_Section_card_table ">
                              <table>
                                <tr>
                                  <td>Your share</td>
                                  <td className="right">{calc(YourShare)}%</td>
                                </tr>
                                <tr>
                                  <td>Current Ratio</td>
                                  <td className="right">
                                    {calc(DAOState.CR)}%
                                  </td>
                                </tr>
                                <tr>
                                  <td>Vote Ends</td>
                                  <td className="right">2022-04-202</td>
                                </tr>
                                <tr>
                                  <td>Vote Applies</td>
                                  <td className="right">2022-05-01</td>
                                </tr>
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
        </ProtocolWrapper>
      )}
    </>
  );
};

export default DAOModel;
