import React from "react";
import { useState } from "react";
import "./App.css";
import { BottomSheet, BottomSheetSnapPoint } from "../src/main";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  const [props, _setProps] = useState({
    isBackdrop: true,
    isDragHandle: true,
    isFullscreen: true,
    isPersistent: false,
    isScrollLock: true,
  });

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsOpen(false);
  };

  return (
    <>
      <h2>@web-bottom-sheet/react</h2>
      <button onClick={() => setIsOpen(true)}>
        open {isOpen ? "opened" : "closed"}
      </button>

      <BottomSheet
        open={isOpen}
        isBackdrop={props.isBackdrop}
        isDragHandle={props.isDragHandle}
        isFullscreen={props.isFullscreen}
        isPersistent={props.isPersistent}
        isScrollLock={props.isScrollLock}
        onClose={handleClose}
      >
        <div className="panel">
          <p>This is contents.</p>
          <button onClick={handleClose}>close</button>
          <button
            onClick={() => {
              handleIncrement();
            }}
          >
            count: {count}
          </button>
          <hr />
          <BottomSheetSnapPoint />
        </div>
      </BottomSheet>
    </>
  );
};

export default App;
