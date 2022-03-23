import { useEffect } from "react";
import Account from "./Account";
import LiquidityPoolTabs from "../../../assets/api/LiquidityPoolTabs";
import RemoveLiquidity from "./RemoveLiquidity";
import AddLiquidity from "./AddLiquidity";
import LiquidityTabWrapper from "./LiquidityTab.style";

const Tabs = () => {
  const changeRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle1");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (remove.classList.contains("tabContentToggle2")) {
        remove.classList.remove("tabContentToggle2");
      }
    }
  };

  const removeRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle2");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (remove.classList.contains("tabContentToggle1")) {
        remove.classList.remove("tabContentToggle1");
      }
    }
  };

  useEffect(() => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle2");
  }, []);

  return (
    <>
      <LiquidityTabWrapper>
        <div className="row my-lg-4 my-md-5 my-5 pb-lg-5 pb-md-5 pb-0 LiquidityPool_tab_section d-flex justify-content-center">
          <div className="col-lg-6 col-md-10 col-12">
            <div className="row">
              <div className="col-lg-11 col-12">
                <div className="tabs_card">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {LiquidityPoolTabs.map((val, ind) => {
                        return (
                          <p
                            key={ind}
                            className={`col-6 ${val.class}`}
                            id={val.id}
                            data-toggle="tab"
                            href={val.href}
                            role="tab"
                            aria-controls={val.ariaControls}
                            aria-selected={val.ariaSelected}
                            onClick={ind === 1 ? changeRadius : removeRadius}
                          >
                            {val.name}
                          </p>
                        );
                      })}
                    </div>
                  </nav>

                  <div id="nav-tabContent" className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="nav-AddLiquidity"
                      role="tabpanel"
                      aria-labelledby="nav-AddLiquidity-tab"
                    >
                      <AddLiquidity />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-RemoveLiquidity"
                      role="tabpanel"
                      aria-labelledby="nav-RemoveLiquidity-tab"
                    >
                      <RemoveLiquidity />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <Account />
          </div>
        </div>
      </LiquidityTabWrapper>
    </>
  );
};

export default Tabs;
