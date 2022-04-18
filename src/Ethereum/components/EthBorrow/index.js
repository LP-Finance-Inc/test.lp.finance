import Overview from "./Overview";
import Tabs from "./Tabs";
import EthBorrowWrapper from "./EthBorrow.style";

const EthBorrow = () => {
  return (
    <>
      <EthBorrowWrapper pie={100}>
        <div className="container EthBorrow_Section">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="EthBorrow_Section_title text-center">
                <h1>CBS Protocol</h1>
              </div>
              <div className="EthBorrow_Section_subtitle text-center">
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
