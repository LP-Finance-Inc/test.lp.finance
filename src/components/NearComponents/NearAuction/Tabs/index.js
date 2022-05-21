import { useEffect } from "react";
import AuctionTabsApi from "../../../../assets/api/global/AuctionTabsApi";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Account from "./Account";
import AuctionTabsWrapper from "../../../../styles/Common/components/AuctionTab.style";

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
      <AuctionTabsWrapper>
        <div className="row my-lg-5 my-md-5 my-sm-4 my-5 pb-lg-4 pb-md-4 pb-sm-3 pb-3 pt-lg-2 pt-md-2 pt-sm-2 pt-0 Auction_tab_section d-flex justify-content-center">
          <div className="col-lg-6 col-md-10 col-12">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-11 col-12">
                <div className="tabs_card">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {AuctionTabsApi.map((val, ind) => {
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
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-Deposit"
                      role="tabpanel"
                      aria-labelledby="nav-Deposit-tab"
                    >
                      <Deposit />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-Withdraw"
                      role="tabpanel"
                      aria-labelledby="nav-Withdraw-tab"
                    >
                      <Withdraw />
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
      </AuctionTabsWrapper>
    </>
  );
};

export default Tabs;
