import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("componet Mount");

    return () => {
      console.log("component did unmonut");
    };
  }, []);

  useEffect(() => {
    console.log("Count Updated:", count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count Life Cycle: {count}
      </button>
    </div>
  );
};

export default Counter;
