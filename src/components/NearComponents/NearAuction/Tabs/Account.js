import React from "react";

const Account = () => {
  const Table = [
    {
      title: "Deposit",
      price: 0,
      css: "3px solid #FFFFFF80",
    },
  ];

  return (
    <>
      <div className="row d-flex justify-content-center Auction_Account mt-lg-0 mt-5">
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
          <div className="row my-2">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <div className="Account_title pl-lg-1 pl-md-4 pl-sm-2 pl-0 ">
                <p>Your Account</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-12">
              <div className="right_arrow_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-1 col-md-1 col-sm-1 col-12  d-flex justify-content-end">
              <div className="bottom_arrow_img text-center">
                <hr />
                <img src="/images/diamond.png" alt="Loading..." />
              </div>
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="Account_card">
                <table width="100%">
                  <tbody>
                    {Table.map((val, ind) => {
                      return (
                        <tr
                          key={ind}
                          style={
                            val.css
                              ? { borderBottom: val.css }
                              : { borderBottom: "" }
                          }
                        >
                          <td className="left">
                            <p>{val.title}</p>
                          </td>
                          <td className="right"></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
