import React from "react";
import OrderCard from "./OrderCard";

const baskecCardGroup = ({ orders }) => {
  return (
    <>
      {orders.map((order) => (
        <OrderCard key={order.id} isActive={order.isActive} />
      ))}
    </>
  );
};

export default baskecCardGroup;
