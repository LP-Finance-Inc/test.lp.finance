import React from "react";
import DataLoaderWrapper from "./DataLoader.style";

const DataLoader = (props) => {
  return (
    <DataLoaderWrapper>
      <div className="DataLoader_overlay">
        <div className="DataLoader">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="icon_div" style={{ height: props.height }}>
                  <img src={props.img} alt="Loader" className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataLoaderWrapper>
  );
};

export default DataLoader;
