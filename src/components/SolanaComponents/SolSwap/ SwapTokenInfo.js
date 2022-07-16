import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDimensions from "react-cool-dimensions";
import moment from "moment";
import { CalcFiveDigit, numFormatter } from "../../../helper";

const SwapTokenInfo = ({ inputTokenId, outputTokenId, outputImg }) => {
  const [chartData, setChartData] = useState([]);
  const [baseTokenId, setBaseTokenId] = useState("");
  const [quoteTokenId, setQuoteTokenId] = useState("");
  const [inputTokenInfo, setInputTokenInfo] = useState(null);
  const [outputTokenInfo, setOutputTokenInfo] = useState(null);
  const [mouseData, setMouseData] = useState(null);
  const [daysToShow, setDaysToShow] = useState(1);
  const [InputList, setInputList] = useState({});
  const [OutputList, setOutputList] = useState({});
  const { observe, width, height } = useDimensions();

  const handleMouseMove = (coords) => {
    if (coords.activePayload) {
      setMouseData(coords.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setMouseData(null);
  };

  const getChartData = async () => {
    const inputResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${baseTokenId}/ohlc?vs_currency=usd&days=${daysToShow}`
    );
    const outputResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${quoteTokenId}/ohlc?vs_currency=usd&days=${daysToShow}`
    );
    const inputData = await inputResponse.json();
    const outputData = await outputResponse.json();

    let data = [];

    if (Array.isArray(inputData)) {
      data = data.concat(inputData);
    }
    if (Array.isArray(outputData)) {
      data = data.concat(outputData);
    }

    const formattedData = data.reduce((a, c) => {
      const found = a.find((price) => price.time === c[0]);

      if (found) {
        if (["usd-coin", "tether"].includes(quoteTokenId)) {
          found.price = found.inputPrice / c[4];
        } else {
          found.price = c[4] / found.inputPrice;
        }
      } else {
        a.push({ time: c[0], inputPrice: c[4] });
      }
      return a;
    }, []);
    formattedData[formattedData.length - 1].time = Date.now();
    setChartData(formattedData.filter((d) => d.price));
  };

  useEffect(() => {
    if (!inputTokenId || !outputTokenId) {
      return;
    }
    if (["usd-coin", "tether"].includes(inputTokenId)) {
      setBaseTokenId(outputTokenId);
      setQuoteTokenId(inputTokenId);
    } else {
      setBaseTokenId(inputTokenId);
      setQuoteTokenId(outputTokenId);
    }

    return () => {
      setBaseTokenId("");
      setQuoteTokenId("");
    };
  }, [inputTokenId, outputTokenId]);

  const getInputTokenInfo = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${inputTokenId}?localization=false&tickers=false&developer_data=false&sparkline=false
      `
    );
    const data = await response.json();

    setInputTokenInfo(data);

    const getInputData = {
      img: data.image.small,
      symbol: data.symbol.toUpperCase(),
      name: data.name,
      price: `$${CalcFiveDigit(data.market_data.current_price.usd)}`,
      percentage: data.market_data.price_change_percentage_24h.toFixed(2),
      MarketData: [
        {
          id: 1,
          title: "Market Cap Rank",
          value: `#${data.market_cap_rank}`,
        },
        {
          id: 2,
          title: "Market Cap",
          value: `$${numFormatter(data.market_data.market_cap.usd)}`,
        },
        {
          id: 3,
          title: "24h Volumn",
          value: `$${numFormatter(data.market_data.total_volume.usd)}`,
        },
        {
          id: 4,
          title: "Token Supply",
          value: `${numFormatter(data.market_data.circulating_supply)}`,
          property: `Max Supply: ${numFormatter(data.market_data.max_supply)}`,
        },
        {
          id: 5,
          title: "All-Time High",
          value: `$${CalcFiveDigit(data.market_data.ath.usd)}`,
          percentage: (data.market_data?.ath_change_percentage?.usd).toFixed(2),
          property: moment(data.market_data.ath_date.usd).fromNow(),
        },
        {
          id: 6,
          title: "All-Time Low",
          value: `$${CalcFiveDigit(data.market_data.atl.usd)}`,
          percentage: (data.market_data.atl_change_percentage?.usd).toFixed(2),
          property: moment(data.market_data.atl_date.usd).fromNow(),
        },
      ],
    };

    setInputList(getInputData);
  };

  const getOutputTokenInfo = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${outputTokenId}?localization=false&tickers=false&developer_data=false&sparkline=false
      `
    );
    const data = await response.json();
    setOutputTokenInfo(data);

    const getOutData = {
      img: data.image.small,
      symbol:
        data.symbol.toUpperCase() === "SOL"
          ? "wSOL"
          : data.symbol.toUpperCase(),
      name: data.name,
      price: CalcFiveDigit(data.market_data.current_price.usd),
      percentage: data.market_data.price_change_percentage_24h.toFixed(2),
      MarketData: [
        {
          id: 1,
          title: "Market Cap Rank",
          value: `#${data.market_cap_rank}`,
        },
        {
          id: 2,
          title: "Market Cap",
          value: `$${numFormatter(data.market_data.market_cap.usd)}`,
        },
        {
          id: 3,
          title: "24h Volumn",
          value: `$${numFormatter(data.market_data.total_volume.usd)}`,
        },
        {
          id: 4,
          title: "Token Supply",
          value: `${numFormatter(data.market_data.circulating_supply)}`,
          property: `Max Supply: ${numFormatter(data.market_data.max_supply)}`,
        },
        {
          id: 5,
          title: "All-Time High",
          value: `$${CalcFiveDigit(data.market_data.ath.usd)}`,
          percentage: (data.market_data?.ath_change_percentage?.usd).toFixed(2),
          property: moment(data.market_data.ath_date.usd).fromNow(),
        },
        {
          id: 6,
          title: "All-Time Low",
          value: `$${CalcFiveDigit(data.market_data.atl.usd)}`,
          percentage: (data.market_data.atl_change_percentage?.usd).toFixed(2),
          property: moment(data.market_data.atl_date.usd).fromNow(),
        },
      ],
    };

    setOutputList(getOutData);
  };

  useMemo(() => {
    if (baseTokenId && quoteTokenId) {
      getChartData();
    }

    return () => {
      setChartData([]);
    };
  }, [daysToShow, baseTokenId, quoteTokenId]);

  useMemo(() => {
    if (baseTokenId) {
      getInputTokenInfo();
    }
    if (quoteTokenId) {
      getOutputTokenInfo();
    }

    return () => {
      setOutputTokenInfo(null);
      setInputTokenInfo(null);
    };
  }, [baseTokenId, quoteTokenId]);

  const chartChange = chartData.length
    ? ((chartData[chartData.length - 1]["price"] - chartData[0]["price"]) /
        chartData[0]["price"]) *
      100
    : 0;

  return (
    <div className="container mt-4 TradingView_chart" ref={observe}>
      <div className="row">
        <div className="col-6">
          <div className="trading_name">
            {inputTokenInfo && outputTokenInfo ? (
              <div>
                {`${outputTokenInfo?.symbol?.toUpperCase()}/${inputTokenInfo?.symbol?.toUpperCase()}`}
              </div>
            ) : null}
          </div>
          <div className="trading_Details">
            {mouseData ? (
              <>
                <div className="price">
                  {CalcFiveDigit(mouseData?.price)}
                  <span
                    className={
                      chartChange >= 0 ? "ml-2 text-green" : "ml-2 text-red"
                    }
                  >
                    {chartChange.toFixed(2)}%
                  </span>
                </div>
                <div className="time">
                  {moment(mouseData?.time).format("DD MMM YY, h:mma")}
                </div>
              </>
            ) : (
              <>
                <div className="price">
                  {CalcFiveDigit(chartData[chartData.length - 1]?.price)}
                  <span
                    className={
                      chartChange >= 0 ? "ml-2 text-green" : "ml-2 text-red"
                    }
                  >
                    {chartChange.toFixed(2)}%
                  </span>
                </div>
                <div className="time">
                  {moment(chartData[chartData.length - 1]?.time).format(
                    "DD MMM YY, h:mma"
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-start trading_timers">
          <div className="d-flex align-items-center">
            <button
              onClick={() => setDaysToShow(1)}
              className={daysToShow === 1 ? "active" : "notActive"}
            >
              24H
            </button>
            <button
              onClick={() => setDaysToShow(7)}
              className={daysToShow === 7 ? "ml-2 active " : "ml-2 notActive"}
            >
              1W
            </button>
            <button
              onClick={() => setDaysToShow(30)}
              className={daysToShow === 30 ? "ml-2 active " : "ml-2 notActive"}
            >
              1M
            </button>
            <button
              onClick={() => setDaysToShow(60)}
              className={daysToShow === 60 ? "ml-2 active " : "ml-2 notActive"}
            >
              2M
            </button>
            <button
              onClick={() => setDaysToShow(180)}
              className={daysToShow === 180 ? "ml-2 active " : "ml-2 notActive"}
            >
              3M
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <AreaChart
                width={width}
                height={height}
                data={chartData}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Tooltip
                  cursor={{
                    strokeOpacity: 0,
                  }}
                  content={<></>}
                />
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b4898" stopOpacity={0.9} />
                    <stop offset="90%" stopColor="#8b4898" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  isAnimationActive={true}
                  type="monotone"
                  dataKey="price"
                  stroke="#8b4898"
                  fill="url(#gradientArea)"
                />
                <XAxis dataKey="time" hide />
                <YAxis
                  dataKey="price"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  hide
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {inputTokenInfo && outputTokenInfo && baseTokenId ? (
        <div className="row mt-5">
          <div className="col-12">
            <div className="accordion">
              {InputList && (
                <div className="accordion-tab">
                  <input
                    type="checkbox"
                    className="accordion-toggle"
                    name="toggle"
                    id="toggle1"
                  />
                  <label for="toggle1">
                    <div className="row TokenInfo">
                      <div className="col-lg-6 col-md-4 col-6 TokenInfo_left">
                        <div className="img_section">
                          {InputList?.img && (
                            <img
                              src={InputList?.img}
                              alt={InputList?.name}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="name pl-2">
                          <p> {InputList?.symbol}</p>
                          <span> {InputList?.name}</span>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 col-4 TokenInfo_right d-flex justify-content-end align-items-center">
                        <div className="details pl-2">
                          <p>{InputList?.price}</p>

                          <span
                            className={` pl-3 ${
                              InputList?.percentage >= 0
                                ? "text-green"
                                : "text-red"
                            }`}
                          >
                            {InputList.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="accordion-content-section">
                      <div className="row accordion-content-Header">
                        <div className="col-12">
                          <p>Market Data</p>
                        </div>
                      </div>
                      <div className="row accordion-content-list">
                        {InputList?.MarketData?.map((list) => {
                          return (
                            <div
                              className={
                                list.id > 3
                                  ? "col-lg-4 col-md-6 col-12 mt-3"
                                  : "col-lg-4 col-md-6 col-12 mt-lg-2 mt-3"
                              }
                              key={list.id}
                            >
                              <div className="list_card">
                                <div className="title">
                                  <p>{list.title}</p>
                                </div>
                                <div className="value">
                                  <span>
                                    {list.value}
                                    {list.percentage && (
                                      <p
                                        className={` pl-2 ${
                                          list?.percentage >= 0
                                            ? "text-green"
                                            : "text-red"
                                        }`}
                                      >
                                        {list.percentage}%
                                      </p>
                                    )}
                                  </span>
                                  {list?.property && <p>{list.property}</p>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {OutputList && (
                <div className="accordion-tab">
                  <input
                    type="checkbox"
                    className="accordion-toggle"
                    name="toggle"
                    id="toggle2"
                  />
                  <label for="toggle2">
                    <div className="row TokenInfo">
                      <div className="col-lg-6 col-md-4 col-6 TokenInfo_left">
                        <div className="img_section">
                          {outputImg && (
                            <img
                              src={outputImg}
                              alt={OutputList?.name}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="name pl-2">
                          <p> {OutputList?.symbol}</p>
                          <span> {OutputList?.name}</span>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 col-4 TokenInfo_right d-flex justify-content-end align-items-center">
                        <div className="details pl-2">
                          <p>{OutputList?.price}</p>

                          <span
                            className={` pl-3 ${
                              OutputList?.percentage >= 0
                                ? "text-green"
                                : "text-red"
                            }`}
                          >
                            {OutputList.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="accordion-content-section">
                      <div className="row accordion-content-Header">
                        <div className="col-12">
                          <p>Market Data</p>
                        </div>
                      </div>
                      <div className="row accordion-content-list">
                        {OutputList?.MarketData?.map((list) => {
                          return (
                            <div
                              className={
                                list.id > 3
                                  ? "col-lg-4 col-md-6 col-12 mt-3"
                                  : "col-lg-4 col-md-6 col-12 mt-lg-2 mt-3"
                              }
                              key={list.id}
                            >
                              <div className="list_card">
                                <div className="title">
                                  <p>{list.title}</p>
                                </div>
                                <div className="value">
                                  <span>
                                    {list.value}
                                    {list.percentage && (
                                      <p
                                        className={` pl-2 ${
                                          list?.percentage >= 0
                                            ? "text-green"
                                            : "text-red"
                                        }`}
                                      >
                                        {list.percentage}%
                                      </p>
                                    )}
                                  </span>
                                  {list?.property && <p>{list.property}</p>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SwapTokenInfo;
