import React from "react";

const ExerciseContext = React.createContext();

function ExerciseContextProvider(props) {
  return (
    <ExerciseContext.Provider value={{ name: "jake" }}>
      {props.children}
    </ExerciseContext.Provider>
  );
}

export { ExerciseContextProvider, ExerciseContext };
