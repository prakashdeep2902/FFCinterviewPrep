import { useSelector } from "react-redux";
import EmployeeCard from "./EmployeeCard";

function EmployeeList() {
  // here i am using this concept:
  // useSelector
  // Reading data from store

  const { employees, loading, error } = useSelector((state) => state.employees);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>Employees</h2>

      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default EmployeeList;
