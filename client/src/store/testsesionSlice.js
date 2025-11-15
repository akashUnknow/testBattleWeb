import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  examName: null,
  completed: false,
  mode: "EASY",
  score: null,
  userid: null,
};

const testsesionSlice = createSlice({
  name: "testsession", // ← FIXED NAME
  initialState,
  reducers: {
    testStart(state, action) {
      const { userid, examName, mode, completed, id } = action.payload;
      state.userid = userid;
      state.completed = completed;
      state.examName = examName;  
      state.mode = mode;
      state.id = id;
    },
    testSubmit(state, action) {
      const { id, completed, score } = action.payload;
      state.id = id;
      state.completed = completed;
      state.score = score;
    },
    setTestSession(state, action) {
      state.testSessionId = action.payload;
    },
    setCompleted(state, action) {
      state.completed = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setScode(state, action) {
      state.score = action.payload;
    },
    setUserId(state, action) {
      state.userid = action.payload;
    },

    resetTest(state) {
      state.testSessionId = null;
      state.completed = false;
      state.mode = "EASY";
      state.score = null;
      state.userid = null;
    },
  },
});

export const {
  testStart,
  testSubmit,
  setTestSession,
  setCompleted,
  setMode,
  setScode,
  setUserId,
  resetTest,
} = testsesionSlice.actions;

export default testsesionSlice.reducer;
