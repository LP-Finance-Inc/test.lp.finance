import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { bottomAddLiquidityTokenSelect } from "../../../redux/actions/LiquidityPoolActions";
import BottomAddLiquidityWrapper from "./BottomAddLiquidity.style";

const BottomAddLiquidityModel = ({
  bottomAddLiquidityModel,
  setBottomAddLiquidityModel,
}) => {
  const dispatch = useDispatch();

  const AddLiquidityState = useSelector(
    (state) => state.TopAddLiquidityReducer
  );

  const filterBottomAddLiquidityModel = () => {
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

  const removeOverLay = (img, name) => {
    dispatch(bottomAddLiquidityTokenSelect(img, name));
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    overlay.classList.remove("show");

    setTimeout(() => {
      setBottomAddLiquidityModel(false);
    }, 500);
  };

  useEffect(() => {
    if (bottomAddLiquidityModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {bottomAddLiquidityModel && (
        <BottomAddLiquidityWrapper>
          <div id="overlay" className="BottomAddLiquidityModel_overlay">
            <div className="BottomAddLiquidityModel" id="popup">
              <div className="container-fluid BottomAddLiquidityModel_section">
                <div className="row d-flex align-items-center BottomAddLiquidityModel_top_Section pb-2">
                  <div className="col-lg-8 col-10 p-0 m-0">
                    <div className="title">
                      <p>Select a token</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-2  p-0 m-0 d-flex justify-content-end">
                    <div className="close_div">
                      <RiCloseCircleLine
                        className="close_icon"
                        onClick={() => setBottomAddLiquidityModel(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row BottomAddLiquidityModel_bottom_Section mt-4">
                  <div className="col-12">
                    <div className="search_box">
                      <input
                        type="text"
                        name="search"
                        autoComplete="off"
                        id="myInput"
                        placeholder="Search name"
                        onKeyUp={() => filterBottomAddLiquidityModel()}
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
                        {AddLiquidityState.list.map((val, ind) => {
                          return (
                            <div className="col-12" key={ind} id="tokens">
                              <div
                                className="details"
                                onClick={() => removeOverLay(val.img, val.name)}
                              >
                                <div className="row">
                                  <div className="col-8 d-flex align-items-center">
                                    <img
                                      src={val.img}
                                      alt="Loading..."
                                      height="29"
                                      width="29"
                                    />
                                    <div className="ml-3 details_name">
                                      <span>{val.name}</span>
                                      <p>{val.fullName}</p>
                                    </div>
                                  </div>
                                  <div className="col-4 d-flex  justify-content-end">
                                    <div className="balance d-flex">
                                      <p className="mr-2">0.00</p>
                                      <span className="mr-3">{val.name}</span>
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
        </BottomAddLiquidityWrapper>
      )}
    </>
  );
};

export default BottomAddLiquidityModel;
