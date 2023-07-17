import React from "react";
import errorPage from "../Asset/error.avif";

export const Error = () => {
  return (
    <div style={{ width: "100%", height: "85vh" }}>
      <img src={errorPage} alt="" width={"100%"} height={"100%"} />
    </div>
  );
};
