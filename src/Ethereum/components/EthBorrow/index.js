import Overview from "./Overview";
import Tabs from "./Tabs";
import EthBorrowWrapper from "./EthBorrow.style";
import { useSelector } from "react-redux";

const EthBorrow = () => {
  const lpContractState = useSelector((state) => state.lpContractReducers);

  return (
    <>
      <EthBorrowWrapper pie={lpContractState.Borrow.Overview.NetLTV}>
        <div className="container EthBorrow">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="EthBorrow_title text-center">
                <h1>CBS Protocol</h1>
              </div>
              <div className="EthBorrow_subtitle text-center">
                <h1>Borrow Stablecoin at 0% APY</h1>
              </div>
            </div>
          </div>
          <Overview />
          <Tabs />
        </div>
      </EthBorrowWrapper>
    </>
  );
};

export default EthBorrow;
