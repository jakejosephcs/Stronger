import React from "react";

function ButtonPrimary({ color, onClick, text }) {
  return (
    <button
      className={`bg-${
        color ? color : "blue-500"
      } text-white py-2 px-5 rounded-full text-center mb-4`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonPrimary;
