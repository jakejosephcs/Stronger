import React from "react";

function ButtonPrimary({ color, onClick, text }) {
  return (
    <div
      className={`bg-${
        color || "blue"
      }-500 text-white py-2 px-5 rounded-full text-center mb-4`}
    >
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default ButtonPrimary;
