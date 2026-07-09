import { useDispatch } from "react-redux";

import { removeEmployee } from "../features/employees/employeeSlice";

function EmployeeCard({ employee }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeEmployee(employee.id));
  };

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>{employee.name}</h3>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EmployeeCard;

// here i am using this concept:
// dispatch(action)
