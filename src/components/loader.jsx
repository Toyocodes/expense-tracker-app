import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  <ColorRing
    visible={true}
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
  />;

 
  return (
    <div className="flex justify-center items-center">
      <ColorRing
        height="80"
        width="80"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loader;
