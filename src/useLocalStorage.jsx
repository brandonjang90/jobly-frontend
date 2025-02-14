import { useState } from "react";

function useLocalStorage(key, initialValue = null) {
  // Initialize the state with the value from localStorage or the initial value.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        // Parse JSON if the stored value is valid JSON.
        return isJson(item) ? JSON.parse(item) : item;
      }
      return initialValue; 
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return initialValue;
    }
  });


   // Function to update the value in both localStorage and React state.
  const setValue = (value) => {
    try {
      if (value === null) {
        // Remove the key from localStorage if the value is null.
        window.localStorage.removeItem(key);
      } else {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        window.localStorage.setItem(key, valueToStore);
      }
       // Update the React state.
      setStoredValue(value);
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  };
  
  // Return the current value and the function to update it.  
  return [storedValue, setValue]; 
}


// Function to check if a string is valid JSON.
const isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export default useLocalStorage;
