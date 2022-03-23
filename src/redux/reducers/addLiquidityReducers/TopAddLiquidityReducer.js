import { MatchAddLiquidityApi } from "../../../assets/api/LiquidityPoolApi";
const point = "/images/tokens/";

const initialState = {
  name1: "lpUSD",
  img1: point + "lpUSD.png",
  img2: point + "USDC.png",
  name2: "USDC",

  list: [
    {
      img: point + "USDC.png",
      name: "USDC",
    },
  ],
};

const TopAddLiquidityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOP_ADD_LIQUIDITY_TOKEN_SELECT":
      const { img, name } = action.payload;

      let fetch = [];

      for (var i = 0; i < MatchAddLiquidityApi.length; i++) {
        if (action.payload.img === MatchAddLiquidityApi[i].img1) {
          fetch.push(MatchAddLiquidityApi[i]);
        } else if (action.payload.img === MatchAddLiquidityApi[i].img2) {
          fetch.push({
            id: MatchAddLiquidityApi[i].id,
            img1: MatchAddLiquidityApi[i].img2,
            img2: MatchAddLiquidityApi[i].img1,
            name1: MatchAddLiquidityApi[i].name2,
            name2: MatchAddLiquidityApi[i].name1,
            fullName1: MatchAddLiquidityApi[i].fullName2,
            fullName2: MatchAddLiquidityApi[i].fullName1,
          });
        }
      }

      return {
        ...state,
        name1: name,
        img1: img,
        img2: fetch[0].img2,
        name2: fetch[0].name2,

        list: fetch.map((val) => {
          return {
            img: val.img2,
            name: val.name2,
          };
        }),
      };

    case "BOTTOM_ADD_LIQUIDITY_TOKEN_SELECT":
      return {
        ...state,
        img2: action.payload.img,
        name2: action.payload.name,
      };

    default:
      return state;
  }
};

export default TopAddLiquidityReducer;
