import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AutoScrollToTop = ({ children }) => {
  const location = useLocation();
  // const navigate = useNavigate()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

export default AutoScrollToTop;
