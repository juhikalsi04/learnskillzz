import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Result = ({ selectedOptions, testNo }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch questions based on the test number
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/onlinetest/sampletest/${testNo}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [testNo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Calculate total marks
    const totalMarks = questions.length;

    // Calculate marks obtained based on selected options and correct answers
    let marksObtained = 0;
    questions.forEach((question, index) => {
        const correctAnswers = question.correctAnswer; // Get correct answer from question object
        const selectedOption = selectedOptions[index]; // Get selected option for current question
        if (selectedOption !== undefined && selectedOption === correctAnswers) {
            marksObtained++;
        }
    });

    // Calculate the number of wrong choices
    const wrongChoices = totalMarks - marksObtained;

    // Calculate percentage
    const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);

    // Define styles for different percentage ranges
    const progressBarStyles = buildStyles({
        pathColor: percentage <= 33 ? 'red' : percentage <= 66 ? 'orange' : 'green',
        textColor: percentage <= 33 ? 'red' : percentage <= 66 ? 'orange' : 'green',
    });

    // Define navigation function based on percentage
    const navigateTo = percentage <= 66 ? '/' : '/onlinetest';

    // Define navigation text based on percentage
    const navigationText = percentage <= 66 ? 'Visit our website' : 'Go to Online Test';

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Your Result</h2>

                {/* Circular progress bar */}
                <div className="flex justify-center items-center mb-4">
                    <div style={{ width: '100px' }}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={progressBarStyles} />
                    </div>
                </div>

                {/* Text below progress bar */}
                <div className="text-center mb-4">
                    {percentage <= 33 ? (
                        <>
                            <p className="text-red-500 text-2xl font-bold">Poor</p>
                            <p>Visit our website for practice questions and come back with great preparation.</p>
                        </>
                    ) : percentage <= 66 ? (
                        <>
                            <p className="text-orange-500 text-2xl font-bold">Average</p>
                            <p>Need to improve more. Visit our site for more practice questions.</p>
                        </>
                    ) : (
                        <>
                            <p className="text-green-500 text-2xl font-bold">Well done!!</p>
                            <p>Thank you for using Learnskillz. Happy Learning!!</p>
                        </>
                    )}
                </div>

                {/* Boxes for correct answers and percentage */}
                <div className="flex justify-between mb-4">
                    <div className={`flex-1 p-4 rounded-lg mr-4 bg-green-200 text-center`}>
                        <p className="text-lg font-bold" style={{ fontSize: '15px', marginBottom: '12px' }}>Correct Choices</p>
                        <p className="text-xl text-green-500" style={{ fontSize: '50px' }}>{marksObtained}</p>
                    </div>
                    <div className={`flex-1 p-4 rounded-lg bg-red-200 text-center`}>
                        <p className="text-lg font-bold" style={{ fontSize: '15px', marginBottom: '12px' }}>Wrong Choices</p>
                        <p className="text-xl text-red-500" style={{ fontSize: '50px', marginBottom: "12px" }}>{wrongChoices}</p>
                    </div>
                </div>

                {/* Go to Next Test or Visit Homepage */}
                <div className="text-center">
                    <span
                        className="text-blue-500 underline cursor-pointer"
                        onClick={() => {
                            navigate(navigateTo);
                        }}
                    >
                        {navigationText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Result;
