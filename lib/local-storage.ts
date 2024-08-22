import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string | boolean) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // Return the stored value if it exists, otherwise return the initial value
    return storedValue !== null
      ? typeof initialValue === "boolean"
        ? storedValue === "true"
        : storedValue
      : initialValue;
  });

  const setLocalStorageValue = (newValue: string | boolean) => {
    setValue(newValue);
    localStorage.setItem(key, newValue.toString());
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem(key);
      // Update state based on the new value from localStorage
      setValue(
        newValue !== null
          ? typeof initialValue === "boolean"
            ? newValue === "true"
            : newValue
          : initialValue,
      );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [value, setLocalStorageValue] as const;
};

export default useLocalStorage;
