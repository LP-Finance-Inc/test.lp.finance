import { TableTitles, TableApi } from "../../assets/api/TableApi";

const Overview = () => {
  return (
    <>
      <div className="row table_section my-lg-5 my-md-5 my-3 pt-lg-4 pt-md-4 pt-4 pb-lg-4 pb-md-4 pb-2">
        <div className="col-12">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  {TableTitles.map((titles) => {
                    return (
                      <th scope="col" key={titles.id}>
                        {titles.title}
                        {titles.img ? (
                          <img
                            src={titles.img}
                            alt="Loading..."
                            className="ml-2"
                          />
                        ) : (
                          ""
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {TableApi.map((Data, ind) => {
                  const length = TableApi.length;
                  return (
                    <tr
                      key={Data.id}
                      style={
                        ind === length - 1
                          ? { borderBottom: "none" }
                          : { border: "" }
                      }
                    >
                      <td
                        style={
                          ind === length - 1
                            ? { paddingBottom: "15px" }
                            : { paddingBottom: "" }
                        }
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={Data.img1}
                            alt="Loading..."
                            height="27"
                            width="27"
                          />
                          <span className="ml-2 mr-3 d-flex align-items-center">
                            <img
                              src={Data.img2}
                              alt="Loading..."
                              height="27"
                              width="27"
                            />
                          </span>

                          <span> {Data.val1}</span>
                        </div>
                      </td>
                      <td>
                        <p>{Data.val2}</p>
                      </td>
                      <td>
                        <p>{Data.val3}</p>
                      </td>
                      <td>
                        <p>{Data.val4}</p>
                      </td>
                      <td>
                        <p>{Data.val5}</p>
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
