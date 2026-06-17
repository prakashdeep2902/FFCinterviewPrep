import React, { useState } from "react";
import Example from "./component/Example";
import { UserContext } from "./UserContext";
import Example2 from "./component/Example2";
import Rendering from "./component/Rendering";
import Counter from "./component/Counter";

const App = () => {
  const user = {
    name: "vikash",
    age: 29,
  };

  console.log(UserContext);

  const [Count, setCount] = useState(0);

  return (
    <>
      <UserContext.Provider value={user}>
        <div>
          <h1>APP</h1>
          <Example value={"24"} />
          <Example2 />

          <button onClick={() => setCount((prev) => prev + 1)}>{Count}</button>

          <Rendering />
          <Counter />
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
