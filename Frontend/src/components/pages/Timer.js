import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ limit, onTimeUpdate }) => {
    const calculateTimeLeft = () => {
        const difference = limit - Math.floor((Date.now() - startTime) / 1000);
        return difference > 0 ? difference : 0;
    };

    const [startTime] = useState(Date.now());
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft <= 90) {
                setIsWarning(true);
            } else {
                setIsWarning(false);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [limit]);

    const textStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: isWarning ? '#ff6b6b' : '#000' // Red text when warning
    };

    // Convert timeLeft to minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    useEffect(() => {
        onTimeUpdate(timeLeft);
    }, [timeLeft, onTimeUpdate]);

    return (
        <div style={textStyle}>
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
    );
};

export default CountdownTimer;
