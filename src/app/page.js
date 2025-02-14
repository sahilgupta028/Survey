"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { initialQuestions } from "@/data/questions";
import Submitted from "@/components/submitted";

const SurveyApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSessionId(Date.now().toString());
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setQuestions(initialQuestions);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const startSurvey = () => {
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitSurvey = async () => {
    try {
      await axios.post("http://localhost:3000/api/submit", {
        sessionId,
        answers,
        status: "COMPLETED"
      });
      setSubmitted(true);
      setTimeout(() => {
        setCurrentQuestionIndex(null);
        setSubmitted(false);
        setAnswers({});
        setSessionId(Date.now().toString());
      }, 5000);
    } catch (error) {
      console.error("Error submitting survey", error);
    }
  };

  if (submitted) {
    return (
      <Submitted />
    );
  }

  if (currentQuestionIndex === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6 text-center">
        <motion.div
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Our Survey!</h1>
          <p className="text-gray-600 mb-6">Your feedback helps us improve our services. Click below to begin.</p>
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg mt-4"
            onClick={startSurvey}
            whileHover={{ scale: 1.1 }}
          >
            Start Survey
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-screen-2xl w-full bg-gradient-to-r from-purple-400 to-blue-500 p-4">
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">Question {currentQuestionIndex + 1} / {questions.length}</h2>
        <p className="mb-4 text-gray-700 text-lg">{question?.text}</p>
        <AnimatePresence>
          {question?.type === "rating" ? (
            <motion.div className="flex flex-wrap gap-2 space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {[...Array(question.max)].map((_, i) => (
                <motion.button
                  key={i + 1}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${answers[question.id] === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} hover:bg-blue-500 hover:text-white`}
                  onClick={() => handleAnswer(i + 1)}
                  whileHover={{ scale: 1.1 }}
                >
                  {i + 1}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleAnswer(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          <motion.button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            whileHover={{ scale: 1.1 }}
          >
            Previous
          </motion.button>
          {currentQuestionIndex === questions.length - 1 ? (
            <motion.button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={submitSurvey}
              whileHover={{ scale: 1.1 }}
            >
              Submit
            </motion.button>
          ) : (
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={nextQuestion}
              whileHover={{ scale: 1.1 }}
            >
              Next
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SurveyApp;
