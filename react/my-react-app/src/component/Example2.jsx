import React, { useRef } from "react";

const Example2 = React.memo(() => {
  const inputRef = useRef();
  const divRef = useRef();
  const handelClick = () => {
    console.log(1);
    inputRef.current.focus();
    inputRef.current.style.border = "2px solid red";
    inputRef.current.style.backgroundColor = "lightyellow";

    divRef.current.style.backgroundColor = "blue";
  };

  return (
    <div style={{ width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        name="name"
        placeholder="Enter the Element"
      />
      <button onClick={handelClick}> Click for Focus</button>

      <div
        ref={divRef}
        style={{ width: "5rem", height: "5rem", border: "1px solid red" }}
      ></div>
    </div>
  );
});

export default Example2;
