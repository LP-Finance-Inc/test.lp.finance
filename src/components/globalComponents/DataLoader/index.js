import React from "react";
import DataLoaderWrapper from "./DataLoader.style";

const DataLoader = () => {
  return (
    <DataLoaderWrapper>
      <div className="row DataLoader_overlay">
        <div className="col-12 d-flex justify-content-center">
          <div className="DataLoader">
            <img src="/images/Loader/Loader.png" alt="Loader" />
          </div>
        </div>
      </div>
    </DataLoaderWrapper>
  );
};

export default DataLoader;
