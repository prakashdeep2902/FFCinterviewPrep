import { useState } from "react";
import { useDispatch } from "react-redux";

import { addEmployee } from "../features/employees/employeeSlice";

function AddEmployee() {
  const [name, setName] = useState("");

  // here i am using this concept:
  // useDispatch

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name) return;

    dispatch(
      addEmployee({
        id: Date.now(),
        name,
      }),
    );

    setName("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleAdd}>Add Employee</button>
    </div>
  );
}

export default AddEmployee;
