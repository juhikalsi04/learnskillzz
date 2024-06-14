import React, { useState, useEffect } from "react";

const Practice = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [answerSelected, setAnswerSelected] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/aptitude");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setQuestionsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    if (answerSelected[questionIndex]) return;

    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: optionIndex,
    });

    setAnswerSelected({
      ...answerSelected,
      [questionIndex]: true,
    });

    // Check if the selected option is incorrect and mark the question
    if (questionsData[questionIndex].correctAnswer !== optionIndex) {
      markQuestion(questionIndex, false);
    } else {
      markQuestion(questionIndex, true);
    }
  };

  const markQuestion = (questionIndex, isCorrect) => {
    setShowAnswer({
      ...showAnswer,
      [questionIndex]: isCorrect,
    });
  };

  const handleReset = () => {
    setSelectedOptions({});
    setShowAnswer({});
    setAnswerSelected({});
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold ml-4 font-poppins">Aptitude Questions</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-5 mr-4"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="container mx-auto font-poppins ml-4 mx-4">
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {questionsData.map((questionObj, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>{questionObj.question}</p>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {questionObj.options.map((option, optionIndex) => (
                  <li
                    key={`${index}-${optionIndex}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: "70px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      border: '1px solid black',
                      borderRadius: '8px',
                      marginBottom: "20px",
                      fontSize: "20px",
                      cursor: "pointer",
                      backgroundColor: showAnswer[index] !== undefined && questionObj.correctAnswer === optionIndex ? 'lightgreen' :
                        (selectedOptions[index] === optionIndex ? (questionObj.correctAnswer === optionIndex ? 'lightgreen' : 'lightcoral') : 'white'),
                      borderColor: showAnswer[index] !== undefined && questionObj.correctAnswer === optionIndex ? 'green' :
                        (selectedOptions[index] === optionIndex ? (questionObj.correctAnswer === optionIndex ? 'green' : 'red') : 'black'),
                    }}
                    onClick={() => handleOptionChange(index, optionIndex)}
                    disabled={answerSelected[index]}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {showAnswer[index] !== undefined && (
                <p className="text-xl font-semibold" style={{ color: showAnswer[index] ? 'green' : 'red' }}>
                  {showAnswer[index] ? "Well done! You got the right answer." : `Wrong answer! Correct answer is ${questionObj.options[questionObj.correctAnswer]}`}
                </p>
              )}
              {!answerSelected[index] && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
                  onClick={() => handleOptionChange(index, -1)}
                >
                  Show Answer
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Practice;
