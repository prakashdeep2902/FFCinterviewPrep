import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import FetchEmployees from "./components/FetchEmployees.jsx";

function App() {
  return (
    <div>
      <h1>Employee Manager</h1>

      <AddEmployee />
      <FetchEmployees />
      <EmployeeList />
    </div>
  );
}

export default App;
