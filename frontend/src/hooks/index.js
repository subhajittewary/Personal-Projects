import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const useIsMobileQuery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 768);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return (() => {
      window.removeEventListener("resize", handleWindowSizeChange)
    })
  }, [])
  return isMobile;
}

