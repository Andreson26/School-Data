import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/students/all"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (studentData) => {
    console.log(studentData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/create",
        studentData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ studentId, studentData }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/students/${studentId}`,
        studentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/students/${studentId}`);
      return studentId;
    } catch (error) {
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.error = null;
    });

    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createStudent.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.students.push(action.payload);
      state.error = null;
    });

    builder.addCase(createStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        );
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
