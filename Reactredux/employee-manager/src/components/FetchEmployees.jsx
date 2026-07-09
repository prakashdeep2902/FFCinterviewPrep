import { useDispatch } from "react-redux";
import { fetchEmployees } from "../features/employees/employeeSlice";

function FetchEmployees() {
  const dispatch = useDispatch();

  const handleFetch = () => {
    // here i am using this concept:
    // createAsyncThunk
    dispatch(fetchEmployees());
  };

  return <button onClick={handleFetch}>Fetch Employees From API</button>;
}

export default FetchEmployees;
