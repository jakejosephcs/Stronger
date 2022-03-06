import React from "react";

function Container(props) {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      {props.children}
    </div>
  );
}

export default Container;
