import Table from "./Table";
import Tabs from "./Tabs";
import LiquidityPoolWrapper from "./LiquidityPool.style";

const LiquidityPool = () => {
  return (
    <>
      <LiquidityPoolWrapper>
        <div className="container LiquidityPool">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="LiquidityPool_title text-center">
                <h1>Liquidity Pool</h1>
                <h1>Add Liquidity and Earn Rewards</h1>
              </div>
            </div>
          </div>
          <Table />
          <Tabs />
        </div>
      </LiquidityPoolWrapper>
    </>
  );
};

export default LiquidityPool;
