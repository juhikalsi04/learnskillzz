import React, { useState, useEffect } from 'react';
import CountdownTimer from './Timer';
import { useNavigate, useParams } from 'react-router-dom';
import Result from '../Result';

const SampleTest = () => {
    const { testNo } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // Object to store selected options for each question
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const countdownLimit = 100;
    const [remainingTime, setRemainingTime] = useState(countdownLimit);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    // Submit the test automatically when time runs out
                    handleAlertSubmit();
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSaveAndNext = () => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [currentQuestion]: selectedOption
        }));

        handleNextQuestion();
    };

    const handlePreviousQuestion = () => {
        const prevSelectedOption = selectedOptions[currentQuestion - 1];
        setCurrentQuestion(prev => Math.max(0, prev - 1));
        setSelectedOption(prevSelectedOption || null);
    };

    const handleNextQuestion = () => {
        const nextQuestion = Math.min(questions.length - 1, currentQuestion + 1);
        const nextQuestionSelectedOption = selectedOptions[nextQuestion];

        setSelectedOption(nextQuestionSelectedOption !== undefined ? nextQuestionSelectedOption : null);

        setCurrentQuestion(nextQuestion);
    };

    const handleClearSelection = () => {
        setSelectedOption(null);
    };

    const handleAlertSubmit = () => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [currentQuestion]: selectedOption
        }));
        setIsSubmitted(true);
        setShowAlert(false);
    };

    const currentTest = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {!isSubmitted && questions.length > 0 ? (
                        <>
                            {!isSubmitted && (
                                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
                                    <CountdownTimer limit={countdownLimit} onTimeUpdate={(time) => setRemainingTime(time)} />
                                </div>
                            )}

                            <div style={{ position: 'relative', minHeight: '100vh' }}>
                                {showAlert && (
                                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '16px', boxShadow: '0px 0px 40px rgba(0,0,0,0.3)', textAlign: 'center' }}>
                                            <p style={{ marginBottom: '40px', fontSize: '24px' }}>Are you sure you want to submit the test?</p>
                                            <p style={{ fontSize: '20px' }}>Remaining Time: {Math.floor(remainingTime / 60)} minutes {remainingTime % 60} seconds</p>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                                                <button onClick={handleAlertSubmit} style={{ marginRight: '20px', padding: '12px 24px', fontSize: '20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Yes</button>
                                                <button onClick={() => setShowAlert(false)} style={{ padding: '12px 24px', fontSize: '20px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>No</button>
                                            </div>
                                        </div>
                                    </div>

                                )}

                                {!isSubmitted && questions.length > 0 && (
                                    <div style={{ padding: '20px' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ fontSize: "20px", borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                                        {currentTest.question}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                            {currentTest.options.map((option, index) => (
                                                                <li key={index}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        height: "70px",
                                                                        paddingLeft: "15px",
                                                                        border: '1px solid black',
                                                                        borderRadius: '8px',
                                                                        marginBottom: "20px",
                                                                        fontSize: "20px",
                                                                        cursor: "pointer",
                                                                        backgroundColor: index === selectedOption ? 'lightblue' : 'white'
                                                                    }}
                                                                    onClick={() => setSelectedOption(index)}
                                                                >
                                                                    <div>
                                                                        {option}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="container my-5 d-flex justify-content-between">
                                            <button type="button" className="btn btn-danger" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                                                Previous Question
                                            </button>
                                            <button type="button" className="btn btn-danger mx-2" style={{ marginLeft: '8px' }} onClick={handleClearSelection}>
                                                Clear Selection
                                            </button>
                                            {isLastQuestion ? (
                                                <button type="button" className="btn btn-primary" onClick={() => setShowAlert(true)}>
                                                    Submit Test
                                                </button>
                                            ) : (
                                                <button type="button" className="btn btn-success mx-2" style={{ marginLeft: '8px', marginRight: '8px' }} onClick={handleSaveAndNext}>
                                                    Save and Next Question
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Result selectedOptions={selectedOptions} testNo={testNo} />
                    )}
                </>
            )}
        </>
    );
};

export default SampleTest;
