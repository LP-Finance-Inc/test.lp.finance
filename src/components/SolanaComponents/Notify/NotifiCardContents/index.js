import React from "react";
import MarketingToggle from "../MarketingToggle";
import { useDispatch } from "react-redux";
import { useNotifiSubscribe } from "../../../../notifi-react-card/hooks";
import { NotifiEmailInput } from "../../../../notifi-react-card/components";

const NotifiCardContents = ({ publicKey }) => {
  const dispatch = useDispatch();
  const { loading, subscribe } = useNotifiSubscribe();

  const subscribeFun = async (event) => {
    event.preventDefault();
    await subscribe(dispatch);
  };

  return (
    <>
      <form onSubmit={subscribeFun} autoComplete="off">
        <div className="row Notify_card d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-center form_control">
            <NotifiEmailInput disabled={loading} />
          </div>

          <MarketingToggle disabled={loading} />

          <div className="col-12 d-flex justify-content-center mt-4 form_control">
            <button disabled={loading} type="submit">
              {loading ? (
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
                <>{publicKey ? "Subscribe" : "Connect wallet"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NotifiCardContents;
