import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import DAOModelWrapper from "./DAOModel.style";
import { calc } from "../../../helper";
import { useDispatch, useSelector } from "react-redux";
import { VoteFun } from "../../../redux/actions/CBS_DAO";
import { useWallet } from "@solana/wallet-adapter-react";

const DAOModel = ({ daOModel, setDAOModel }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const dispatch = useDispatch();
  const [vote, setVote] = useState();
  const [Loading, setLoading] = useState(false);
  const [voteMessage, setVoteMessage] = useState("Submit");

  const getVotePer = (e) => {
    setVote(e.target.value);
  };

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const DAOState = useSelector((state) => state.DAOReducer);

  const TotalSupply = lpContractState.Borrow.Overview.TotalSupply;
  const UserCollateral = lpContractState.variables.UserTotalDepositedCal;

  // Your Share: (User Collateral / Total Supply) * 100%
  const YourShare = (UserCollateral / TotalSupply) * 100;

  const voteAction = (e) => {
    e.preventDefault();
    if (publicKey) {
      setVoteMessage("Submit");
      dispatch(VoteFun(YourShare, vote, setVote, setLoading, publicKey));
    } else {
      setVoteMessage("Connect wallet");
    }
  };

  useEffect(() => {
    if (daOModel) {
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      popup.classList.add("show");
      overlay.classList.add("show");
    }
  }, []);

  useEffect(() => {
    if (publicKey) {
      setVoteMessage("Submit");
    }
  }, [publicKey]);

  return (
    <>
      {daOModel && (
        <DAOModelWrapper width="600px">
          <div id="overlay" className="DAO_overlay">
            <div className="DAOModel" id="popup">
              <div className="container-fluid DAO_section">
                <div className="row DAO_bottom_Section my-3 d-flex justify-content-center align-items-center">
                  <div className="col-12">
                    <div className="row vote_Section d-flex  justify-content-center">
                      <div className="col-12 mt-2 d-flex justify-content-center">
                        <div className="vote_Section_card">
                          <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                              <div className="vote_Section_card_title">
                                <p>CBS DAO</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-5 pt-3">
                            <div className="col-6 d-flex justify-content-center flex-column">
                              <form method="POST" onSubmit={voteAction}>
                                <div className="input_Card">
                                  <input
                                    type="text"
                                    placeholder="00.00"
                                    value={vote}
                                    onChange={getVotePer}
                                    required
                                  />
                                </div>
                                <div className="btn_Section d-flex justify-content-center mt-3">
                                  <button type="submit" disabled={Loading}>
                                    {Loading ? (
                                      <p
                                        style={{
                                          color: "snow",
                                          fontSize: "1.5rem",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItem: "center",
                                        }}
                                      >
                                        <i className="zmdi zmdi-rotate-left zmdi-hc-spin-reverse"></i>
                                      </p>
                                    ) : (
                                      `${voteMessage}`
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                            <div className="col-6 vote_Section_card_table ">
                              <table>
                                <tr>
                                  <td>Your share</td>
                                  <td className="right">{calc(YourShare)}%</td>
                                </tr>
                                <tr>
                                  <td>Current Ratio</td>
                                  <td className="right">
                                    {calc(DAOState.CR)}%
                                  </td>
                                </tr>
                                <tr>
                                  <td>Vote Ends</td>
                                  <td className="right">2022-04-202</td>
                                </tr>
                                <tr>
                                  <td>Vote Applies</td>
                                  <td className="right">2022-05-01</td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DAOModelWrapper>
      )}
    </>
  );
};

export default DAOModel;
