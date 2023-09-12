import { useState } from "react";
import { MyGlobalContext } from "./globalContext";

export const ThemeGlobalContext = ({ children }) => {
  //Global context
  const [base, setBase] = useState(false);

  const globalContext = {
    base,
    setBase,
  };
  return (
    <MyGlobalContext.Provider value={globalContext}>
      {children}
    </MyGlobalContext.Provider>
  );
};
