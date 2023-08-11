import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

export const useLocalStorageState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const itemValue = getLocalStorage(key);
    if (itemValue === null) return defaultValue;
    try {
      return itemValue;
    } catch {
      return defaultValue;
    }
  });
  return [
    value,
    (val) => {
      setLocalStorage(key, val);
      setValue(val);
    },
  ];
};

// export const useLocalStorageState = (localStorageKey, defaultValue) => {
//   const [value, setValue] = useState(() => {
//     const itemValue = getLocalStorage(localStorageKey);
//     if (itemValue === null) return defaultValue;
//     try {
//       return itemValue;
//     } catch {
//       return defaultValue;
//     }
//   });

//   useEffect(() => {
//     setLocalStorage(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };
