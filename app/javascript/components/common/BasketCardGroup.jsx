import React from "react";
import OrderCard from "./OrderCard";

const BasketCardGroup = ({ orders, addToBill, removeFromBill }) => {
  return (
    <>
      {orders.map((order) => (
        <OrderCard
          key={order.book_id}
          order={order.book}
          orderId={order.id}
          addToBill={addToBill}
          removeFromBill={removeFromBill}
        />
      ))}
    </>
  );
};

export default BasketCardGroup;
