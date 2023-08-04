import React, { useEffect, useState } from "react";
import "./service.css";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
const { Meta } = Card;

export const Ourservice = () => {
  const params = useParams();
  const [serviceDetails, setServiceDetails] = useState([]);

  const getDetails = async () => {
    const { data } = await axios.get(`/api/service`);
    const filterData = data.details.filter((i) => {
      return i.title.toLowerCase() === params.name.toLowerCase();
    });
    setServiceDetails(filterData);
  };

  useEffect(() => {
    getDetails();
  });
  return (
    <>
      <div className="service">
        <h2>{params.name}</h2>
        <div className="service-wrapper">
          {serviceDetails.length > 0 &&
            serviceDetails.map((e) => {
              return (
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={`/uploads/${e.image}`} />}
                >
                  <Meta title={e.title} description={e.address} />
                  <p>Contact : {e.mobile}</p>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};
