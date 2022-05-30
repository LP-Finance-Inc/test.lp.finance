import { BsPlusCircleFill } from "react-icons/bs";

const AddLiquidity = () => {
  return (
    <>
      <div className="row AddLiquidity d-flex justify-content-center">
        <div className="col-lg-8 col-md-10 col-12 mt-3 mb-1">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input type="number" placeholder="00.00" autoComplete="off" />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7  d-flex justify-content-end AddLiquidity_card_right">
                <button>
                  <img
                    src="/images/tokens/SolanaTokens/SOL.png"
                    alt="Loading..."
                    height="29"
                    width="29"
                  />

                  <span className="ml-3">SOL</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-1 d-flex justify-content-center">
          <div className="plus_icon_section">
            <BsPlusCircleFill className="icon" />
          </div>
        </div>

        <div className="col-lg-8 col-md-10 col-12 mb-2">
          <div className="AddLiquidity_card">
            <div className="row d-flex align-items-center">
              <div className="col-lg-5 col-md-5 col-5 AddLiquidity_card_left">
                <div className="d-flex align-items-center">
                  <input type="number" placeholder="00.00" autoComplete="off" />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-7 d-flex justify-content-end AddLiquidity_card_right">
                <button>
                  {/* <img src="" alt="Loading..." height="29" width="29" />) */}
                  <span className="ml-3">Select a token</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-3">
                  <div className="btn_section">
                    <button>Add Liquidity</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLiquidity;
