import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// here i am using this concept:
// createAsyncThunk
// Async API calls

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  },
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,

  reducers: {
    addEmployee: (state, action) => {
      // here i am using this concept:
      // Immer
      // Looks like mutation but isn't
      console.log("state of employee::", initialState);

      state.employees.push(action.payload);
    },

    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload,
      );
    },
  },

  // here i am using this concept:
  // extraReducers
  // pending fulfilled rejected

  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch employees";
      });
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

// here i am using this concept:
// createSlice
// Actions
// Reducers
// Async thunk
