import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./PaymentSuccess.css";
import { height } from "@mui/system";
const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];
  const referenceNum = seachQuery.get("reference");
  return (
    <div className="orderSuccess">
      <img
        src="https://www.svgrepo.com/show/13650/success.svg"
        alt="Payment Successful"
        className="pay-success"
        style={{ height: "100px" }}
      />
      <div>Your Order has been Placed successfully </div>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default PaymentSuccess;
