import {
  TableTitles,
  TableApi,
} from "../../../assets/api/Solana/SolLiquidityPoolApis";

const Overview = () => {
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
                {TableApi.map((list, ind) => {
                  return (
                    <tr key={ind}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={list.img1}
                            alt="Loading..."
                            height="27"
                            width="27"
                          />

                          <img
                            src={list.img2}
                            alt="Loading..."
                            height="27"
                            width="27"
                            className="ml-1"
                          />
                          <div className="ml-2">
                            <span> {list.name}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>{list.val1}</p>
                      </td>
                      <td>
                        <p>{list.val2}</p>
                      </td>
                      <td>
                        <p>{list.val3}</p>
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
