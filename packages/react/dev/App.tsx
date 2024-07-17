import { useState } from "react";
import "./App.css";
import React from "react";
import { BottomSheet } from "../src/components/BottomSheet";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    console.log("handleIncrement");
    setCount(count + 1);
  };

  return (
    <>
      <h2>@web-bottom-sheet/vue</h2>
      <button onClick={() => setIsOpen(true)}>open</button>
      <button onClick={handleIncrement}>count: {count}</button>

      <BottomSheet
        open={isOpen}
        snapPoint={"auto"}
        isBackdrop={true}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          close
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleIncrement();
          }}
        >
          count: {count}
        </button>
      </BottomSheet>
    </>
  );
};

export default App;
