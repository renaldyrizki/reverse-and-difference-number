import React, { useState } from "react";
import "./styles.css";

export default function App() {
  // Declare a state variable to hold the input value
  const [inputValue, setInputValue] = useState("");
  const [reverse, setReverse] = useState(0); // State to hold the reverse result
  const [difference, setDifference] = useState(0); // State to hold the difference result

  // Function to handle input change
  function handleInputOnChange(event) {
    // Removes any leading zero and any non-digit character
    const sanitizedRegex = /(^0+(?=\d))|([^\d])/g;
    const sanitizedValue = event.target.value.replace(sanitizedRegex, "");
    // Update the inputValue
    setInputValue(sanitizedValue);
  }

  // Function to handle the submit button click
  function handleInputOnSubmit() {
    let reverseNumber = getReverse(inputValue);
    // Update the reverse result with the current input value
    setReverse(reverseNumber);
    setDifference(Math.abs(inputValue - reverseNumber));
  }

  function getReverse(stringNumber) {
    // Reverse the string number
    let reverseStr = stringNumber.split("").reverse().join("");
    // Convert the result to a number
    return parseInt(reverseStr, 10);
  }

  return (
    <div className="App">
      <div>
        Number:{" "}
        <input type="text" value={inputValue} onChange={handleInputOnChange} />
        <button onClick={handleInputOnSubmit}>Submit</button>
      </div>
      <div>Reverse: {reverse}</div>
      <div>Difference: {difference}</div>
    </div>
  );
}
