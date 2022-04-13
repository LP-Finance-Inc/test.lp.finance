import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { calc, CalcOneDigit, numFormatter } from "../../../helper";
import { useSelector } from "react-redux";
import ProtocolWrapper from "../../Protocol.style";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

const TotalSupplyModel = ({ totalSupplyModel, setTotalSupplyModel }) => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  const {
    SOLDepositedPercentage,
    BTCDepositedPercentage,
    USDCDepositedPercentage,
    mSOLDepositedPercentage,
    ETHDepositedPercentage,
    SRMDepositedPercentage,
    USDTDepositedPercentage,
    USTDepositedPercentage,
    stSOLDepositedPercentage,
    scnSOLDepositedPercentage,
    lpSOLDepositedPercentage,
    lpUSDDepositedPercentage,
    lpBTCDepositedPercentage,
    lpETHDepositedPercentage,
  } = lpContractState.Borrow.pieChart.TotalSupply;

  const {
    TotalDepositedSOL,
    TotalDepositedBTC,
    TotalDepositedUSDC,
    TotalDepositedMSOL,
    TotalDepositedETH,
    TotalDepositedSRM,
    TotalDepositedUSDT,
    TotalDepositedUST,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedLpSOL,
    TotalDepositedLpUSD,
    TotalDepositedLpBTC,
    TotalDepositedLpETH,
  } = lpContractState.StateAccountInfo;

  const {
    DepositedSOLAmountCal,
    DepositedBTCAmountCal,
    DepositedUSDCAmountCal,
    DepositedMSOLAmountCal,
    DepositedETHAmountCal,
    DepositedSRMAmountCal,
    DepositedUSDTAmountCal,
    DepositedUSTAmountCal,
    DepositedstSOLAmountCal,
    DepositedscnSOLAmountCal,
    DepositedLpSOLAmountCal,
    DepositedLpUSDAmountCal,
    DepositedLpBTCAmountCal,
    DepositedLpETHAmountCal,
  } = lpContractState.variables;

  const SOL_PERCENTAGE = CalcOneDigit(SOLDepositedPercentage);
  const BTC_PERCENTAGE = CalcOneDigit(BTCDepositedPercentage);
  const USDC_PERCENTAGE = CalcOneDigit(USDCDepositedPercentage);
  const mSOL_PERCENTAGE = CalcOneDigit(mSOLDepositedPercentage);
  const ETH_PERCENTAGE = CalcOneDigit(ETHDepositedPercentage);
  const SRM_PERCENTAGE = CalcOneDigit(SRMDepositedPercentage);
  const USDT_PERCENTAGE = CalcOneDigit(USDTDepositedPercentage);
  const UST_PERCENTAGE = CalcOneDigit(USTDepositedPercentage);
  const stSOL_PERCENTAGE = CalcOneDigit(stSOLDepositedPercentage);
  const scnSOL_PERCENTAGE = CalcOneDigit(scnSOLDepositedPercentage);
  const lpSOL_PERCENTAGE = CalcOneDigit(lpSOLDepositedPercentage);
  const lpUSD_PERCENTAGE = CalcOneDigit(lpUSDDepositedPercentage);
  const lpBTC_PERCENTAGE = CalcOneDigit(lpBTCDepositedPercentage);
  const lpETH_PERCENTAGE = CalcOneDigit(lpETHDepositedPercentage);

  const BorrowDepositedPieChartLegend = [
    {
      id: 1,
      name: "SOL",
      bg: "#c45dd4",
      img: "/images/tokens/SOL.png",
      price: numFormatter(DepositedSOLAmountCal),
    },
    {
      id: 2,
      name: "BTC",
      bg: "#d4b25d",
      img: "/images/tokens/BTC.png",
      price: numFormatter(DepositedBTCAmountCal),
    },
    {
      id: 3,
      name: "USDC",
      bg: "#7BB6B3",
      img: "/images/tokens/USDC.png",
      price: numFormatter(DepositedUSDCAmountCal),
    },
    {
      id: 4,
      name: "mSOL",
      bg: "#5dd4a8",
      img: "/images/tokens/mSOL.png",
      price: numFormatter(DepositedMSOLAmountCal),
    },
    {
      id: 5,
      name: "ETH",
      bg: "yellow",
      img: "/images/tokens/ETH.png",
      price: numFormatter(DepositedETHAmountCal),
    },
    {
      id: 6,
      name: "SRM",
      bg: "green",
      img: "/images/tokens/SRM.png",
      price: numFormatter(DepositedSRMAmountCal),
    },
    {
      id: 7,
      name: "USDT",
      bg: "grey",
      img: "/images/tokens/USDT.png",
      price: numFormatter(DepositedUSDTAmountCal),
    },
    {
      id: 8,
      name: "UST",
      bg: "red",
      img: "/images/tokens/UST.png",
      price: numFormatter(DepositedUSTAmountCal),
    },
    {
      id: 9,
      name: "stSOL",
      bg: "blue",
      img: "/images/tokens/stSOL.png",
      price: numFormatter(DepositedstSOLAmountCal),
    },
    {
      id: 10,
      name: "scnSOL",
      bg: "pink",
      img: "/images/tokens/scnSOL.png",
      price: numFormatter(DepositedscnSOLAmountCal),
    },

    {
      id: 11,
      name: "lpSOL",
      bg: "#e600b4",
      img: "/images/tokens/lpSOL.png",
      price: numFormatter(DepositedLpSOLAmountCal),
    },
    {
      id: 12,
      name: "lpUSD",
      bg: "#3900e6",
      img: "/images/tokens/lpUSD.png",
      price: numFormatter(DepositedLpUSDAmountCal),
    },
    {
      id: 13,
      name: "lpBTC",
      bg: "maroon",
      img: "/images/tokens/lpBTC.png",
      price: numFormatter(DepositedLpBTCAmountCal),
    },
    {
      id: 14,
      name: "lpETH",
      bg: "purple",
      img: "/images/tokens/lpETH.png",
      price: numFormatter(DepositedLpETHAmountCal),
    },
  ];

  useEffect(() => {
    if (totalSupplyModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }

    const updateChart = () => {
      const type = "pie";

      new Chart("pie-chart", {
        type: type,

        data: {
          labels: [
            {
              name: "SOL",
              per: SOL_PERCENTAGE,
              price: calc(TotalDepositedSOL),
            },
            {
              name: "BTC",
              per: BTC_PERCENTAGE,
              price: calc(TotalDepositedBTC),
            },
            {
              name: "USDC",
              per: USDC_PERCENTAGE,
              price: calc(TotalDepositedUSDC),
            },
            {
              name: "mSOL",
              per: mSOL_PERCENTAGE,
              price: calc(TotalDepositedMSOL),
            },
            {
              name: "ETH",
              per: ETH_PERCENTAGE,
              price: calc(TotalDepositedETH),
            },
            {
              name: "SRM",
              per: SRM_PERCENTAGE,
              price: calc(TotalDepositedSRM),
            },
            {
              name: "USDT",
              per: USDT_PERCENTAGE,
              price: calc(TotalDepositedUSDT),
            },
            {
              name: "UST",
              per: UST_PERCENTAGE,
              price: calc(TotalDepositedUST),
            },
            {
              name: "stSOL",
              per: stSOL_PERCENTAGE,
              price: calc(TotalDepositedstSOL),
            },
            {
              name: "scnSOL",
              per: scnSOL_PERCENTAGE,
              price: calc(TotalDepositedscnSOL),
            },
            {
              name: "lpSOL",
              per: lpSOL_PERCENTAGE,
              price: calc(TotalDepositedLpSOL),
            },
            {
              name: "lpUSD",
              per: lpUSD_PERCENTAGE,
              price: calc(TotalDepositedLpUSD),
            },
            {
              name: "lpBTC",
              per: lpBTC_PERCENTAGE,
              price: calc(TotalDepositedLpBTC),
            },
            {
              name: "lpETH",
              per: lpETH_PERCENTAGE,
              price: calc(TotalDepositedLpETH),
            },
          ],
          datasets: [
            {
              label: "Total Supply",
              data: [
                SOL_PERCENTAGE,
                BTC_PERCENTAGE,
                USDC_PERCENTAGE,
                mSOL_PERCENTAGE,
                ETH_PERCENTAGE,
                SRM_PERCENTAGE,
                USDT_PERCENTAGE,
                UST_PERCENTAGE,
                stSOL_PERCENTAGE,
                scnSOL_PERCENTAGE,
                lpSOL_PERCENTAGE,
                lpUSD_PERCENTAGE,
                lpBTC_PERCENTAGE,
                lpETH_PERCENTAGE,
              ],
              backgroundColor: [
                "#c45dd4",
                "#d4b25d",
                "#7BB6B3",
                "#5dd4a8",
                "yellow",
                "green",
                "grey",
                "UST",
                "blue",
                "pink",
                "#e600b4",
                "#3900e6",
                "maroon",
                "purple",
              ],
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
      {totalSupplyModel && (
        <ProtocolWrapper width="800px">
          <div id="overlay" className="Protocol_overlay">
            <div className="ProtocolModel" id="popup">
              <div className="container-fluid Protocol_section">
                <div className="row d-flex align-items-center Protocol_top_Section pb-2">
                  <div className="col-lg-8 col-10 p-0 m-0">
                    <div className="title">
                      <p>Total Supply</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2  p-0 m-0 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setTotalSupplyModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row Protocol_bottom_Section  d-flex justify-content-center mt-4">
                  <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center mt-3">
                    <canvas id="pie-chart" width="250"></canvas>
                  </div>
                  <div className="col-lg-4 col-12 legend my-3">
                    <div className="row legend_list d-flex justify-content-center align-items-center">
                      {BorrowDepositedPieChartLegend.map((list) => {
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

export default TotalSupplyModel;
