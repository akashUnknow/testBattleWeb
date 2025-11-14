// store/testSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sections: {},
  activeSectionId: null,
  timeLeft: 30 * 60,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    initializeSection: (state, action) => {
      const { sectionId, questions } = action.payload;
      if (!state.sections[sectionId]) {
        state.sections[sectionId] = {
          questions,
          currentQuestion: 1,
          answers: {},
          questionStatus: Array(questions.length).fill('not-visited'),
        };
      }
      state.activeSectionId = sectionId;
    },
    
    setActiveSectionId: (state, action) => {
      state.activeSectionId = action.payload;
    },
    
    setCurrentQuestion: (state, action) => {
      const { sectionId, questionNumber } = action.payload;
      if (state.sections[sectionId]) {
        state.sections[sectionId].currentQuestion = questionNumber;
        
        // Mark as visited if not visited
        const index = questionNumber - 1;
        if (state.sections[sectionId].questionStatus[index] === 'not-visited') {
          state.sections[sectionId].questionStatus[index] = 'visited';
        }
      }
    },
    
    setAnswer: (state, action) => {
      const { sectionId, questionNumber, answer } = action.payload;
      if (state.sections[sectionId]) {
        state.sections[sectionId].answers[questionNumber] = answer;
      }
    },
    
    updateQuestionStatus: (state, action) => {
      const { sectionId, questionNumber, status } = action.payload;
      if (state.sections[sectionId]) {
        state.sections[sectionId].questionStatus[questionNumber - 1] = status;
      }
    },
    
    clearAnswer: (state, action) => {
      const { sectionId, questionNumber } = action.payload;
      if (state.sections[sectionId]) {
        delete state.sections[sectionId].answers[questionNumber];
        state.sections[sectionId].questionStatus[questionNumber - 1] = 'visited';
      }
    },
    
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    
    resetTest: () => initialState,
    
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
  },
});

export const {
  initializeSection,
  setActiveSectionId,
  setCurrentQuestion,
  setAnswer,
  updateQuestionStatus,
  clearAnswer,
  decrementTime,
  resetTest,
  setTimeLeft,
} = testSlice.actions;

export default testSlice.reducer;