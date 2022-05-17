import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import PieChartWrapper from "../../../../styles/Common/model/PieChart.style";
import { CBSBorrowedPieChartList } from "../../../../assets/api/Solana/SolBorrowApis";
import { numFormatter } from "../../../../helper";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

let timerInterval = null;

const TotalBorrowModel = ({ totalBorrowModel, setTotalBorrowModel }) => {
  const [LegendList, setLegendList] = useState([]);

  const {
    NewBorrowBorrowedPieChartLegend,
    NewCBSBorrowedPieChartLegendDetails,
    NewAllTokenPerList,
    NewAllTokenPerColorList,
  } = CBSBorrowedPieChartList();

  const startPriceChart = () => {
    let myTotalBorrowedChart = null;

    const chart = () => {
      const type = "doughnut";

      const ConfigPieChart = {
        type: type,
        data: {
          labels: NewCBSBorrowedPieChartLegendDetails,
          datasets: [
            {
              label: "Total Borrowed",
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

      if (myTotalBorrowedChart !== null) {
        myTotalBorrowedChart.destroy();
      }
      myTotalBorrowedChart = new Chart("totalBorrow_pie_chart", ConfigPieChart);
    };

    chart();

    timerInterval = setInterval(async () => chart(), 30000);

    return () => {
      clearInterval(timerInterval);
    };
  };

  useEffect(() => {
    if (totalBorrowModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }

    setLegendList(NewBorrowBorrowedPieChartLegend);

    return () => {
      setLegendList([]);
    };
  }, []);

  useEffect(() => {
    startPriceChart();
  }, []);

  return (
    <>
      {totalBorrowModel && (
        <PieChartWrapper width="800px">
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

export default TotalBorrowModel;
