import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import DAOModelWrapper from "./DAOModel.style";
import { calc, blockInvalidChar } from "../../../helper";
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
  const [validate, setValidate] = useState(false);

  const lpContractState = useSelector((state) => state.lpContractReducers);

  const DAOState = useSelector((state) => state.DAOReducer);

  const TotalSupply = lpContractState.Borrow.Overview.TotalSupply;
  const UserCollateral = lpContractState.variables.UserTotalDepositedCal;

  // Your Share: (User Collateral / Total Supply) * 100%
  const YourShare = (UserCollateral / TotalSupply) * 100;

  const voteAction = (e) => {
    e.preventDefault();
    if (publicKey) {
      if (vote > 0) {
        if (validate) {
          setVoteMessage("Submit");
          dispatch(VoteFun(YourShare, vote, setVote, setLoading, publicKey));
        }
      } else {
        setVoteMessage("Enter a Value");
      }
    } else {
      setVoteMessage("Connect wallet");
    }
  };

  const getVotePer = (e) => {
    setVote(e.target.value);
    if (publicKey) {
      if (e.target.value > 0) {
        if (e.target.value <= 70) {
          setValidate(true);
          setVoteMessage("Submit");
        } else {
          setValidate(false);
          setVoteMessage("You can vote 70%");
        }
      } else {
        setValidate(false);
        setVoteMessage("Enter a Value");
      }
    } else {
      setValidate(false);
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

  useEffect(() => {
    var voteEnd = document.getElementById("voteEnd");
    var voteApplies = document.getElementById("voteApplies");

    //Get EST date object
    function changeTimeZone(date, timeZone) {
      if (typeof date === "string") {
        return new Date(
          new Date(date).toLocaleString("en-US", {
            timeZone,
          })
        );
      }

      return new Date(
        date.toLocaleString("en-US", {
          timeZone,
        })
      );
    }

    const CurrentDate = changeTimeZone(new Date(), "America/New_York");
    console.log(CurrentDate);

    let day = CurrentDate.getDate();
    let month = CurrentDate.getMonth();
    let year = CurrentDate.getFullYear();
    let endMonth = "";

    if (day > 20) {
      endMonth = month + 1;
    } else {
      endMonth = month;
    }

    voteEnd.innerHTML = `${year}/${endMonth}/20`;
    voteApplies.innerHTML = `${year}/${endMonth + 1}/01`;
  }, []);

  return (
    <>
      {daOModel && (
        <DAOModelWrapper width="600px">
          <div id="overlay" className="DAO_overlay">
            <div className="DAOModel" id="popup">
              <div className="container-fluid DAO_section">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center DAO_top_Section">
                    <div className="DAO_top_Section_title">
                      <p>CBS DAO</p>
                    </div>
                    <div
                      className="close_section"
                      onClick={() => setDAOModel(false)}
                    >
                      <RiCloseCircleLine className="icon" />
                    </div>
                  </div>
                </div>
                <div className="row DAO_bottom_Section my-3 d-flex justify-content-center align-items-center">
                  <div className="col-12">
                    <div className="DAO_Section_card d-flex align-items-center justify-content-center ">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center flex-column mt-lg-0 mt-md-0 mt-3">
                          <form method="POST" onSubmit={voteAction}>
                            <div className="input_Card">
                              <input
                                type="number"
                                placeholder="00.00"
                                value={vote}
                                onKeyDown={blockInvalidChar}
                                onChange={getVotePer}
                                required
                              />
                            </div>
                            <div className="btn_Section d-flex justify-content-center mt-4">
                              <button
                                type="submit"
                                disabled={
                                  YourShare >= 0 ? false : true || Loading
                                }
                              >
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
                        <div className="col-lg-6 col-md-6 col-12 vote_Section_card_table d-flex justify-content-center mt-lg-0 mt-md-0 mt-3">
                          <table>
                            <tr>
                              <td>Your share</td>
                              <td className="right">{calc(YourShare)}%</td>
                            </tr>
                            <tr>
                              <td>Current Ratio</td>
                              <td className="right">
                                {DAOState.TotalCR ? calc(DAOState.TotalCR) : 0}%
                              </td>
                            </tr>
                            <tr>
                              <td>Vote Ends</td>
                              <td className="right" id="voteEnd"></td>
                            </tr>
                            <tr>
                              <td>Vote Applies</td>
                              <td className="right" id="voteApplies"></td>
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
        </DAOModelWrapper>
      )}
    </>
  );
};

export default DAOModel;
