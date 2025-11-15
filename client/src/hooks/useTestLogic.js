// hooks/useTestLogic.js
import { useState, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { examCategories } from "../data/examData";
import {
  initializeSection,
  setActiveSectionId,
  setCurrentQuestion,
  setAnswer,
  updateQuestionStatus,
  clearAnswer,
  decrementTime,
  resetTest,
  setTimeLeft,
} from "../store/testSlice";

export const useTestLogic = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const {
    sections: sectionData,
    activeSectionId,
    timeLeft,
  } = useSelector((state) => state.test);

  // Exam Data
  const examData = {
    name: location.state?.name || "Sample Exam",
    duration: location.state?.duration || "N/A",
    totalQuestions: location.state?.totalQuestions || 10,
    maxMarks: location.state?.maxMarks || "N/A",
  };

  const { name } = examData;

  // Local states
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);

  // Get sections for this exam
  useEffect(() => {
    // Reset state when component mounts (fresh test start)
    dispatch(resetTest());
    dispatch(setTimeLeft(30 * 60)); // Reset timer to 30 minutes

    const getSections = () => {
      for (const category in examCategories) {
        const exam = examCategories[category].find((e) => e.name === name);
        if (exam) return exam.sections;
      }
      return [];
    };

    const examSections = getSections();
    setSections(examSections);

    // Auto-load first section
    if (examSections.length > 0) {
      loadSectionQuestions(examSections[0]);
    }

    // Cleanup on unmount
    return () => {
      dispatch(resetTest());
    };
  }, [name, dispatch]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  // Format time helper
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `00 : ${m} : ${s}`;
  };

  // Get current section data
  const currentSectionData = activeSectionId
    ? sectionData[activeSectionId]
    : null;
  const questions = currentSectionData?.questions || [];
  const currentQuestion = currentSectionData?.currentQuestion || 1;
  const answers = currentSectionData?.answers || {};
  const questionStatus = currentSectionData?.questionStatus || [];
  const selectedOption = answers[currentQuestion] || null;
  const question = questions[currentQuestion - 1];
  const {id}=useSelector((state)=>state.testsesion)

  // Load Questions
  const loadSectionQuestions = async (section) => {
    try {
      setLoading(true);

      // If section already loaded, just switch to it
      if (sectionData[section.id]) {
        dispatch(setActiveSectionId(section.id));
        setLoading(false);
        return;
      }

      // Fetch questions for new section
      const response = await axios.get(
        `${API_URL}/api/exams/questions/random/${section.id}/${section.questions}`
      );

      const data = response.data;

      // Initialize section in Redux
      dispatch(
        initializeSection({
          sectionId: section.id,
          questions: data,
        })
      );
    } catch (e) {
      console.error("Failed loading section questions", e);
    } finally {
      setLoading(false);
    }
  };

  // Move to next available section
  const moveToNextSection = () => {
    const currentSectionIndex = sections.findIndex(
      (sec) => sec.id === activeSectionId
    );

    // Check if there's a next section
    if (
      currentSectionIndex !== -1 &&
      currentSectionIndex < sections.length - 1
    ) {
      const nextSection = sections[currentSectionIndex + 1];
      loadSectionQuestions(nextSection);
    } else {
      // No more sections, auto-submit
      handleSubmitTest();
    }
  };

  // Navigation Button Logic
  const handleSaveAndNext = () => {
    if (selectedOption && activeSectionId) {
      // Save answer
      dispatch(
        setAnswer({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          answer: selectedOption,
        })
      );

      // Mark as answered
      dispatch(
        updateQuestionStatus({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          status: "answered",
        })
      );
    }

    // Move to next question in current section
    if (currentQuestion < questions.length) {
      dispatch(
        setCurrentQuestion({
          sectionId: activeSectionId,
          questionNumber: currentQuestion + 1,
        })
      );
    } else {
      // Current section is complete, move to next section
      moveToNextSection();
    }
  };

  const handleMarkForReview = () => {
    if (!activeSectionId) return;

    // Save answer if selected
    if (selectedOption) {
      dispatch(
        setAnswer({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          answer: selectedOption,
        })
      );
    }

    // Mark for review
    dispatch(
      updateQuestionStatus({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
        status: "marked",
      })
    );

    // Move to next question or next section
    if (currentQuestion < questions.length) {
      dispatch(
        setCurrentQuestion({
          sectionId: activeSectionId,
          questionNumber: currentQuestion + 1,
        })
      );
    } else {
      // Current section is complete, move to next section
      moveToNextSection();
    }
  };

  const handleClearResponse = () => {
    if (!activeSectionId) return;

    dispatch(
      clearAnswer({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
      })
    );
  };

  const goToQuestion = (num) => {
    if (!activeSectionId) return;

    dispatch(
      setCurrentQuestion({
        sectionId: activeSectionId,
        questionNumber: num,
      })
    );
  };

  const handleOptionChange = (option) => {
    if (!activeSectionId) return;

    dispatch(
      setAnswer({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
        answer: option,
      })
    );
  };

  const getQuestionButtonClass = (index) => {
    const status = questionStatus[index];
    const active = index + 1 === currentQuestion;

    if (active) return "bg-blue-600 text-white";
    if (status === "answered") return "bg-green-500 text-white";
    if (status === "marked") return "bg-yellow-400 text-black";
    if (status === "visited") return "bg-red-500 text-white";

    return "bg-white border border-gray-300";
  };

  const countStatus = (s) => questionStatus.filter((x) => x === s).length;

  // Submit Test
  const handleSubmitTest = async () => {
    let totalCorrect = 0;
    let totalAttempted = 0;
    let totalQuestions = 0;

    // Calculate results across all sections
    Object.keys(sectionData).forEach((sectionId) => {
      const section = sectionData[sectionId];
      totalQuestions += section.questions.length;

      section.questions.forEach((q, i) => {
        const ans = section.answers[i + 1];
        if (ans) totalAttempted++;

        const correctAns = [q.option1, q.option2, q.option3, q.option4][
          q.correctOption - 1
        ];

        if (ans === correctAns) totalCorrect++;
      });
    });

    // Reset Redux state before navigation
    dispatch(resetTest());

    navigate("/result", {

      state: {
        total: totalQuestions,
        attempted: totalAttempted,
        correct: totalCorrect,
        scorePercent: ((totalCorrect / totalQuestions) * 100).toFixed(2),
        name,
      },
      
      
    });
    const scorePercent=Number(((totalCorrect / totalQuestions) * 100).toFixed(2))
    
    try {
      const payload = {
        testSessionId: id,
        completed: true,
        score: scorePercent,
      };
      console.log(payload)

      const res = await axios.post(`${API_URL}/api/tests/submit`, payload);
          console.log("Submit Response:", res.data);
          
    } catch (error) {
      console.log(error);
    }
  };

  // Get dynamic button text
  const getSaveNextButtonText = () => {
    if (
      currentQuestion === questions.length &&
      sections.findIndex((s) => s.id === activeSectionId) ===
        sections.length - 1
    ) {
      return "Submit Test";
    }
    if (currentQuestion === questions.length) {
      return "Next Section";
    }
    return "Save & Next";
  };

  return {
    // State
    examData,
    sections,
    loading,
    activeSectionId,
    timeLeft,
    currentQuestion,
    questions,
    question,
    selectedOption,
    questionStatus,

    // Functions
    formatTime,
    loadSectionQuestions,
    handleSaveAndNext,
    handleMarkForReview,
    handleClearResponse,
    goToQuestion,
    handleOptionChange,
    getQuestionButtonClass,
    countStatus,
    handleSubmitTest,
    getSaveNextButtonText,
  };
};
