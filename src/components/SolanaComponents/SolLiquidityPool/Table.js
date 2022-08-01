import { TableTitles } from "../../../assets/api/Solana/SolLiquidityPoolApis";
import { Token } from "../../../assets/api/global";
import { numFormatter } from "../../../helper";

const Overview = ({ TableList }) => {
  return (
    <>
      <div className="row mt-3 table_section my-lg-5 my-md-5 my-3 pb-lg-4 pb-md-4 pb-2">
        <div className="col-12">
          <div className="table_card table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  {TableTitles.map((head) => {
                    return (
                      <th scope="col" key={head.id}>
                        <div className="d-flex align-items-center">
                          <p>{head.title}</p>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {TableList?.map((list, ind) => {
                  return (
                    <tr key={ind}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={Token.SOLANA[list.name1]}
                            alt="Loading..."
                            height="27"
                            width="27"
                          />

                          <img
                            src={Token.SOLANA[list.name2]}
                            alt="Loading..."
                            height="27"
                            width="27"
                            className="ml-1"
                          />
                          <div className="ml-2">
                            <span> {`${list.name1}-${list.name2}`}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>$ {numFormatter(list.Liquidity)}</p>
                      </td>
                      <td>
                        <p>$ {list.Fees}</p>
                      </td>
                      <td>
                        <p>{list.APY}%</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
