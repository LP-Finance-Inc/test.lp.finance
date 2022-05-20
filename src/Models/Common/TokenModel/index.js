import React, { useEffect } from "react";
import TokenModelWrapper from "../../../styles/Common/model/TokenModel.style";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { calc, CalcFourDigit } from "../../../helper";

const TokenModel = ({
  tokenModel,
  setTokenModel,
  TokensApi,
  TokenSelectFun,
}) => {
  const dispatch = useDispatch();

  const FilterFunction = () => {
    var input, filter, i, li, div, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("token_list");
    li = div.getElementsByTagName("div");
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const CloseTokenModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setTokenModel(false);
    }, 400);
  };

  const SelectToken = (val) => {
    dispatch(TokenSelectFun(val));
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      setTokenModel(false);
    }, 400);
  };

  useEffect(() => {
    if (tokenModel) {
      document.querySelector(".popup").classList.add("active");
    }
  }, []);

  return (
    <TokenModelWrapper height="300px">
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid Model_section">
            <div className="row d-flex align-items-center Model_top_Section pb-2">
              <div className="col-lg-8 col-10">
                <div className="title">
                  <p>Select a token</p>
                </div>
              </div>
              <div className="col-lg-4 col-2 d-flex justify-content-end">
                <div className="close_div">
                  <RiCloseCircleLine
                    className="close_icon"
                    onClick={CloseTokenModel}
                  />
                </div>
              </div>
            </div>
            <div className="row Model_bottom_Section mt-4">
              <div className="col-12">
                <div className="search_box">
                  <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    id="myInput"
                    placeholder="Search name"
                    onKeyUp={() => FilterFunction()}
                  />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="token_title">
                  <p>Token name</p>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="token_list">
                  <div className="row" id="token_list">
                    {TokensApi.map((val) => {
                      return (
                        <div className="col-12" key={val.id} id="tokens">
                          <div
                            className="details"
                            onClick={() => SelectToken(val)}
                          >
                            <div className="row">
                              <div className="col-10 d-flex align-items-center">
                                <img
                                  src={val.img}
                                  alt="Loading..."
                                  height="29"
                                  width="29"
                                />

                                <div className="ml-3 details_name">
                                  <span>{val.name}</span>
                                  <p>{val.fullName}</p>
                                  <p>$ {CalcFourDigit(val.TokenPrice)}</p>
                                </div>
                              </div>
                              <div className="col-2 d-flex  justify-content-end">
                                <div className="balance d-flex flex-column">
                                  <p className="mr-2">
                                    {val.Bal > 0 ? calc(val.Bal) : "00.00"}
                                    <span className="ml-2">{val.name}</span>
                                  </p>

                                  <div className="cal_Balance mr-2 mt-2 d-flex justify-content-end">
                                    <p>
                                      {val.TokenPrice
                                        ? `$ ${calc(val.TokenPrice * val.Bal)}`
                                        : `$ 0`}
                                    </p>
                                  </div>
                                </div>
                              </div>
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
      </div>
    </TokenModelWrapper>
  );
};

export default TokenModel;
