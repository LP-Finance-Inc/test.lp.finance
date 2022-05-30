import Table from "./Table";
import Tabs from "./Tabs";
import LiquidityPoolWrapper from "../../../styles/Common/components/LiquitdityPool.style";

const SolLiquidityPool = () => {
  return (
    <LiquidityPoolWrapper>
      <div className="container LiquidityPool">
        <div className="row">
          <div className="col-12  LiquidityPool_top">
            <div className="LiquidityPool_title text-center">
              <h1>Liquidity Pool</h1>
            </div>
            <div className="subtitle text-center mt-1">
              <h1>Add Liquidity and Earn Rewards</h1>
            </div>
          </div>
        </div>
        <Table />
        <Tabs />
      </div>
    </LiquidityPoolWrapper>
  );
};

export default SolLiquidityPool;
