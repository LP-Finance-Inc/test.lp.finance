import React from "react";
import LoaderWrapper from "./Loader.style";

const Loader = () => {
  return (
    <>
      <LoaderWrapper>
        <div className="snipper">
          <img src="/images/LP_Finance_Logo.png" alt="Loading..." />
        </div>
      </LoaderWrapper>
    </>
  );
};

export default Loader;
