import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const LayoutContext = createContext({
  layoutType: "default",
  setLayoutType: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [layoutType, setLayoutType] = useState("default");

  return (
    <LayoutContext.Provider value={{ layoutType, setLayoutType }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed
};
