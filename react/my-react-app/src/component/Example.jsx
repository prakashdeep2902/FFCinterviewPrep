import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Example = React.memo(({ value }) => {
  const { name, age } = useContext(UserContext);
  return (
    <div>
      <h1>value:{value} </h1>
      <h2>name:{name}</h2>
      <h2>age:{age}</h2>
    </div>
  );
});

export default Example;
