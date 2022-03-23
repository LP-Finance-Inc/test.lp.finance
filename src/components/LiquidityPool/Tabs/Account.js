const Table = [
  {
    title: "LP Tokens",
    // price: "0",
  },
  {
    // title: "",
    // subtitle: "400 LPFi-SOL",
    // price: "$ 0",
  },
  {
    // title: "",
    // subtitle: "430 lpUSD-USDC",
    // price: "$ 0",
  },
];

const Account = () => {
  return (
    <>
      <div className="row d-flex justify-content-center LiquidityPool_Account mt-lg-0 mt-4">
        <div className="col-lg-10 col-md-10 col-sm-11 col-12">
          <div className="row my-2">
            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
              <div className="Account_title">
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
            <div className="col-lg-1 col-md-1 col-sm-1 col-12 bottom_arrow_img text-center pl-3">
              <hr />
              <img src="/images/diamond.png" alt="Loading..." />
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-12">
              <div className="Account_card">
                <table width="100%">
                  <tbody>
                    {Table.map((val, ind) => {
                      return (
                        <tr key={ind}>
                          <td className="left">
                            <p>{val.title}</p>
                            {/* <span>{val.subtitle}</span> */}
                          </td>
                          <td className="right">{/* <p>{val.price}</p> */}</td>
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
