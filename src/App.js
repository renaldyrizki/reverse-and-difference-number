import React, { useState } from "react";
import "./styles.css";

export default function App() {
  // Declare a state variable to hold the input value
  const [inputValue, setInputValue] = useState("");
  const [reverse, setReverse] = useState(0); // State to hold the reverse result
  const [difference, setDifference] = useState(0); // State to hold the difference result
  const [fizzBuzz, setFizzBuzz] = useState(0); // State to hold the difference result
  const [fibonacci, setFibonacci] = useState(""); // State to hold the difference result

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
    let differenceNumber = Math.abs(inputValue - reverseNumber);
    let fizzBuzzState = getFizzOrBuzz(differenceNumber);
    let fibonacciState = getFibonacci(differenceNumber);
    // Update the reverse result with the current input value
    setReverse(reverseNumber);
    setDifference(differenceNumber);
    setFizzBuzz(fizzBuzzState);
    setFibonacci(fibonacciState.join(", "));
  }

  function getFibonacci(differenceNumber) {
    let fibonacciArray = [];
    let prev = 0, now = 1;
    let next = 1;
    let checkFizzOrBuzz = "";

    fibonacciArray.push(prev);
    if(differenceNumber >= 1){
      fibonacciArray.push(now);
    }

    while((prev+now) <= differenceNumber){
      next = prev + now;
      prev = now;
      now = next;
      checkFizzOrBuzz = getFizzOrBuzz(next);
      if(checkFizzOrBuzz){
        fibonacciArray.push(checkFizzOrBuzz);
      }else{
        fibonacciArray.push(next);
      }
    }
    
    return fibonacciArray;
  }

  function getFizzOrBuzz(differenceNumber) {
    let state = "";
    if(differenceNumber%3 === 0){
      state += "Fizz";
    }

    if(differenceNumber%5 === 0){
      state += "Buzz";
    }
    
    return state;
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
      <div>Fizz Or Buzz: {fizzBuzz}
        { difference <= 0 &&      
          <div><i>O is FizzBuzz Because 0 % 5 and 0 % 3 are 0</i></div>
        }
      </div>
      <div>Fibonacci: {fibonacci}</div>
    </div>
  );
}
