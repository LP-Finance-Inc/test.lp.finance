import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { numFormatter } from "../../../../helper";
import PieChartWrapper from "../../../../styles/Common/model/PieChart.style";
import { CBSDepositedPieChartList } from "../../../../assets/api/Solana/SolBorrowApis";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

let timerInterval = null;

const TotalSupplyModel = ({ totalSupplyModel, setTotalSupplyModel }) => {
  const {
    NewBorrowDepositedPieChartLegend,
    NewCBSDepositedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  } = CBSDepositedPieChartList();

  const [LegendList, setLegendList] = useState([]);

  const startPriceChart = () => {
    let myTotalSupplyChart = null;

    const chart = () => {
      const type = "pie";

      const ConfigPieChart = {
        type: type,

        data: {
          labels: NewCBSDepositedPieChartLegendDetails,
          datasets: [
            {
              label: "Total Supply",
              data: NewAllTokenPerList,
              backgroundColor: NewAllTokenPerColorList,
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
      };

      if (myTotalSupplyChart !== null) {
        myTotalSupplyChart.destroy();
      }
      myTotalSupplyChart = new Chart("pie-chart", ConfigPieChart);
    };

    chart();

    timerInterval = setInterval(async () => chart(), 30000);

    return () => {
      clearInterval(timerInterval);
    };
  };

  useEffect(() => {
    if (totalSupplyModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }

    setLegendList(NewBorrowDepositedPieChartLegend);

    return () => {
      setLegendList([]);
    };
  }, []);

  useEffect(() => {
    startPriceChart();
  }, []);

  return (
    <>
      {totalSupplyModel && (
        <PieChartWrapper width="800px">
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
                      {LegendList.map((list) => {
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
                                <span className="pl-2">
                                  {" "}
                                  $ {numFormatter(list.price)}
                                </span>
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
        </PieChartWrapper>
      )}
    </>
  );
};

export default TotalSupplyModel;
