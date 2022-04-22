import { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeAddLiquidityApi } from "../../assets/api/LiquidityPoolApi";
import { RemoveAddLiquidityTokenSelect } from "../../redux/actions/LiquidityPoolActions";
import ModelSWrapper from "../Model.style";

const RemoveLiquidityModel = ({
  removeLiquidityModel,
  setRemoveLiquidityModel,
}) => {
  const dispatch = useDispatch();

  const filterFunction = () => {
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

  const removeOverLay = (img1, img2, name) => {
    dispatch(RemoveAddLiquidityTokenSelect(img1, img2, name));
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    overlay.classList.remove("show");

    setTimeout(() => {
      setRemoveLiquidityModel(false);
    }, 500);
  };

  useEffect(() => {
    if (removeLiquidityModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  return (
    <>
      {removeLiquidityModel && (
        <ModelSWrapper height="300px">
          <div id="overlay" className="Model_overlay">
            <div className="Model" id="popup">
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
                        onClick={() => setRemoveLiquidityModel(false)}
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
                        onKeyUp={() => filterFunction()}
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
                        {removeAddLiquidityApi.map((val) => {
                          return (
                            <div className="col-12" key={val.id} id="tokens">
                              <div
                                className="details"
                                onClick={() =>
                                  removeOverLay(val.img1, val.img2, val.name)
                                }
                              >
                                <div className="row">
                                  <div className="col-10 d-flex align-items-center">
                                    <img
                                      src={val.img1}
                                      alt="Loading..."
                                      height="29"
                                      width="29"
                                    />
                                    <div className="ml-2 d-flex align-items-center">
                                      <img
                                        src={val.img2}
                                        alt="Loading..."
                                        height="29"
                                        width="29"
                                      />
                                    </div>

                                    <div className="ml-3 details_name">
                                      <span>{val.name}</span>
                                      {/* <p>{val.fullName}</p> */}
                                    </div>
                                  </div>
                                  <div className="col-2 d-flex  justify-content-end">
                                    {/* <div className="balance d-flex">
                                      <p className="mr-2">0.00</p>
                                      <span className="mr-3">{val.name}</span>
                                    </div> */}
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
        </ModelSWrapper>
      )}
    </>
  );
};

export default RemoveLiquidityModel;