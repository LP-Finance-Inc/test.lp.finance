import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import ProtocolWrapper from "../../Protocol.style";
import { calc, CalcOneDigit, numFormatter } from "../../../helper";
import { useSelector } from "react-redux";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

const TotalBorrowModel = ({ totalBorrowModel, setTotalBorrowModel }) => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    lpSOLBorrowedPercentage,
    lpUSDBorrowedPercentage,
    lpBTCBorrowedPercentage,
    lpETHBorrowedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalBorrowLpSOL,
    TotalBorrowLpUSD,
    TotalBorrowLpBTC,
    TotalBorrowLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    BorrowedLpSOLAmountCal,
    BorrowedLpUSDAmountCal,
    BorrowedLpBTCAmountCal,
    BorrowedLpETHAmountCal,
  } = lpContractState.variables;

  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLBorrowedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDBorrowedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCBorrowedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHBorrowedPercentage);

  const BorrowBorrowedPieChartLegend = [
    {
      id: 1,
      name: "lpSOL",
      bg: "#2085ec",
      img: "/images/tokens/lpSOL.png",
      price: numFormatter(BorrowedLpSOLAmountCal),
    },
    {
      id: 2,
      name: "lpUSD",
      bg: "#72b4eb",
      img: "/images/tokens/lpUSD.png",
      price: numFormatter(BorrowedLpUSDAmountCal),
    },
    {
      id: 3,
      name: "lpBTC",
      bg: "#0a417a",
      img: "/images/tokens/lpBTC.png",
      price: numFormatter(BorrowedLpBTCAmountCal),
    },
    {
      id: 4,
      name: "lpETH",
      bg: "#8464a0",
      img: "/images/tokens/lpETH.png",
      price: numFormatter(BorrowedLpETHAmountCal),
    },
  ];

  useEffect(() => {
    if (totalBorrowModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }

    const updateChart = () => {
      const type = "doughnut";

      new Chart("totalBorrow_pie_chart", {
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
            {
              name: "lpBTC",
              per: lpBTC_PERCENTAGE,
              price: calc(TotalBorrowLpBTC),
            },
            {
              name: "lpETH",
              per: lpETH_PERCENTAGE,
              price: calc(TotalBorrowLpETH),
            },
          ],
          datasets: [
            {
              label: "Total Borrowed",
              data: [
                lpSOL_PERCENTAGE,
                lpUSD_PERCENTAGE,
                lpBTC_PERCENTAGE,
                lpETH_PERCENTAGE,
              ],
              backgroundColor: ["#2085ec", "#72b4eb", "#0a417a", "#8464a0"],
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

  return (
    <>
      {totalBorrowModel && (
        <ProtocolWrapper width="800px">
          <div id="overlay" className="Protocol_overlay">
            <div className="ProtocolModel" id="popup">
              <div className="container-fluid Protocol_section">
                <div className="row d-flex align-items-center Protocol_top_Section pb-2">
                  <div className="col-lg-8 col-10 p-0 m-0">
                    <div className="title">
                      <p>Total Borrowed</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2  p-0 m-0 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setTotalBorrowModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row Protocol_bottom_Section  d-flex justify-content-center  my-5 py-2">
                  <div className="col-lg-8 col-12 d-flex justify-content-center mt-3">
                    <canvas id="totalBorrow_pie_chart" width="250"></canvas>
                  </div>
                  <div className="col-lg-4 col-12 legend my-3 d-flex justify-content-center align-items-center">
                    <div className="row legend_list d-flex justify-content-center">
                      {BorrowBorrowedPieChartLegend.map((list) => {
                        return (
                          <div
                            className="col-12 mt-lg-3 mt-md-0 mt-3"
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
                </div>
              </div>
            </div>
          </div>
        </ProtocolWrapper>
      )}
    </>
  );
};

export default TotalBorrowModel;
