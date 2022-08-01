import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "./Table";
import Tabs from "./Tabs";
import { useSelector } from "react-redux";
import LiquidityPoolWrapper from "../../../styles/Common/components/LiquitdityPool.style";
import { RemoveLiquidityApi } from "../../../assets/api/Solana/SolLiquidityPoolApis";
import { getLiquidityPoolData } from "../../../redux/actions/Solana/SolLiquidityPoolActions";
import { useWallet } from "@solana/wallet-adapter-react";

const SolLiquidityPool = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const NewRemoveLiquidityApi = RemoveLiquidityApi();

  const SolBorrowState = useSelector((state) => state.SolBorrowReducers);
  const SolLiquidityPoolReducers = useSelector(
    (state) => state.SolLiquidityPoolReducers
  );

  const { TokenPriceList, TableList } = SolLiquidityPoolReducers;

  useEffect(() => {
    dispatch(getLiquidityPoolData(wallet, TokenPriceList));
  }, [TokenPriceList, dispatch, wallet]);

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
        <Table TableList={TableList} />
        <Tabs
          SolBorrowState={SolBorrowState}
          SolLiquidityPoolReducers={SolLiquidityPoolReducers}
          NewRemoveLiquidityApi={NewRemoveLiquidityApi}
        />
      </div>
    </LiquidityPoolWrapper>
  );
};

export default SolLiquidityPool;
