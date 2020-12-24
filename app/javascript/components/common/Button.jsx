import React from "react";

const input = ({ text, type, classes, onClick }) => {
  return (
    <>
      <button
        className={`button button_${classes}`}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default input;
