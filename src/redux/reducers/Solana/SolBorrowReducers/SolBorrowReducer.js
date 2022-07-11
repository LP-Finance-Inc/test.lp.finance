import { Token } from "../../../../assets/api/global";
const { SOLANA } = Token;

const initialState = {
  name: "lpUSD",
  img: SOLANA.lpUSD,
};

const SolBorrowReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BORROW_TOKEN_SELECT":
      const { img, name } = action.payload;

      return {
        ...state,
        name,
        img,
      };

    default:
      return state;
  }
};

export default SolBorrowReducer;
