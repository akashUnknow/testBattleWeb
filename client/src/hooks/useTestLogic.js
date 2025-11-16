// hooks/useTestLogic.js - IMPROVED VERSION
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";

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

  const { id } = useSelector((state) => state.testsesion);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs to prevent multiple submissions
  const hasSubmittedRef = useRef(false);
  const isAutoSubmitRef = useRef(false);

  // Get sections for this exam
  useEffect(() => {
    dispatch(resetTest());
    dispatch(setTimeLeft(30 * 60));

    const getSections = () => {
      for (const category in examCategories) {
        const exam = examCategories[category].find((e) => e.name === name);
        if (exam) return exam.sections;
      }
      return [];
    };

    const examSections = getSections();
    setSections(examSections);

    if (examSections.length > 0) {
      loadSectionQuestions(examSections[0]);
    }

    return () => {
      dispatch(resetTest());
    };
  }, [name, dispatch]);

  // Timer with auto-submit
  useEffect(() => {
    if (timeLeft <= 0 && !hasSubmittedRef.current) {
      isAutoSubmitRef.current = true;
      toast.warning("Time's up! Submitting your test...");
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    // Warning at 5 minutes
    if (timeLeft === 300) {
      toast.warning("Only 5 minutes remaining!");
    }

    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

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

  // Load Questions with retry logic
  const loadSectionQuestions = async (section, retryCount = 0) => {
    try {
      setLoading(true);

      if (sectionData[section.id]) {
        dispatch(setActiveSectionId(section.id));
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/exams/questions/random/${section.id}/${section.questions}`,
        { timeout: 10000 }
      );

      const data = response.data;

      dispatch(
        initializeSection({
          sectionId: section.id,
          questions: data,
        })
      );

      toast.success(`${section.name} section loaded`);
    } catch (e) {
      console.error("Failed loading section questions", e);
      
      // Retry logic
      if (retryCount < 2) {
        toast.info(`Retrying... (${retryCount + 1}/2)`);
        setTimeout(() => {
          loadSectionQuestions(section, retryCount + 1);
        }, 1000);
      } else {
        toast.error("Failed to load questions. Please check your connection.");
        // Fallback: navigate back or show error page
      }
    } finally {
      setLoading(false);
    }
  };

  // Move to next available section
  const moveToNextSection = useCallback(() => {
    const currentSectionIndex = sections.findIndex(
      (sec) => sec.id === activeSectionId
    );

    if (
      currentSectionIndex !== -1 &&
      currentSectionIndex < sections.length - 1
    ) {
      const nextSection = sections[currentSectionIndex + 1];
      loadSectionQuestions(nextSection);
      toast.info(`Moving to ${nextSection.name}`);
    } else {
      // No more sections
      toast.info("All sections completed!");
    }
  }, [sections, activeSectionId]);

  // Navigation Button Logic
  const handleSaveAndNext = useCallback(() => {
    if (selectedOption && activeSectionId) {
      dispatch(
        setAnswer({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          answer: selectedOption,
        })
      );

      dispatch(
        updateQuestionStatus({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          status: "answered",
        })
      );
    }

    if (currentQuestion < questions.length) {
      dispatch(
        setCurrentQuestion({
          sectionId: activeSectionId,
          questionNumber: currentQuestion + 1,
        })
      );
    } else {
      moveToNextSection();
    }
  }, [selectedOption, activeSectionId, currentQuestion, questions.length, dispatch, moveToNextSection]);

  const handleMarkForReview = useCallback(() => {
    if (!activeSectionId) return;

    if (selectedOption) {
      dispatch(
        setAnswer({
          sectionId: activeSectionId,
          questionNumber: currentQuestion,
          answer: selectedOption,
        })
      );
    }

    dispatch(
      updateQuestionStatus({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
        status: "marked",
      })
    );

    if (currentQuestion < questions.length) {
      dispatch(
        setCurrentQuestion({
          sectionId: activeSectionId,
          questionNumber: currentQuestion + 1,
        })
      );
    } else {
      moveToNextSection();
    }
  }, [activeSectionId, selectedOption, currentQuestion, questions.length, dispatch, moveToNextSection]);

  const handleClearResponse = useCallback(() => {
    if (!activeSectionId) return;

    dispatch(
      clearAnswer({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
      })
    );
    toast.info("Response cleared");
  }, [activeSectionId, currentQuestion, dispatch]);

  const goToQuestion = useCallback((num) => {
    if (!activeSectionId) return;

    dispatch(
      setCurrentQuestion({
        sectionId: activeSectionId,
        questionNumber: num,
      })
    );
  }, [activeSectionId, dispatch]);

  const handleOptionChange = useCallback((option) => {
    if (!activeSectionId) return;

    dispatch(
      setAnswer({
        sectionId: activeSectionId,
        questionNumber: currentQuestion,
        answer: option,
      })
    );
  }, [activeSectionId, currentQuestion, dispatch]);

  const getQuestionButtonClass = useCallback((index) => {
    const status = questionStatus[index];
    const active = index + 1 === currentQuestion;

    if (active) return "bg-blue-600 text-white border-blue-700";
    if (status === "answered") return "bg-green-500 text-white border-green-600";
    if (status === "marked") return "bg-yellow-400 text-black border-yellow-500";
    if (status === "visited") return "bg-red-500 text-white border-red-600";

    return "bg-white border-gray-300 text-gray-700";
  }, [questionStatus, currentQuestion]);

  const countStatus = useCallback((s) => {
    return questionStatus.filter((x) => x === s).length;
  }, [questionStatus]);

  // Submit Test with confirmation
  const handleSubmitTest = useCallback(async () => {
    // Prevent multiple submissions
    if (hasSubmittedRef.current || isSubmitting) {
      return;
    }

    // Show confirmation unless auto-submit
    if (!isAutoSubmitRef.current) {
      const confirmed = window.confirm(
        "Are you sure you want to submit the test? You cannot change answers after submission."
      );
      if (!confirmed) return;
    }

    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    try {
      let totalCorrect = 0;
      let totalAttempted = 0;
      let totalQuestions = 0;

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

      const scorePercent = Number(
        ((totalCorrect / totalQuestions) * 100).toFixed(2)
      );

      // Submit to backend
      if (id) {
        const payload = {
          testSessionId: id,
          completed: true,
          score: scorePercent,
        };

        await axios.post(`${API_URL}/api/tests/submit`, payload);
        toast.success("Test submitted successfully!");
      }

      // Reset state before navigation
      dispatch(resetTest());

      navigate("/result", {
        state: {
          total: totalQuestions,
          attempted: totalAttempted,
          correct: totalCorrect,
          scorePercent,
          name,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit test. Please try again.");
      hasSubmittedRef.current = false;
      setIsSubmitting(false);
    }
  }, [sectionData, id, API_URL, name, navigate, dispatch, isSubmitting]);

  // Get dynamic button text
  const getSaveNextButtonText = useCallback(() => {
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
  }, [currentQuestion, questions.length, sections, activeSectionId]);

  return {
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
    isSubmitting,
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