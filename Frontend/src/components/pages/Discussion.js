
import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';

const Discussion = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleForm = (form) => {
        if (form === 'login') {
            setShowLogin(true);
            setShowRegister(false);
        } else {
            setShowLogin(false);
            setShowRegister(true);
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const headerStyle = {
        fontSize: '2.5em',
        marginBottom: '30px',
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Welcome to LearnSkillz Discussion Forum</h1>
            <p>Don't have an account? <span style={linkStyle} onClick={() => toggleForm('register')}>Register Here</span></p>
            <p>Already have an account? <span style={linkStyle} onClick={() => toggleForm('login')}>Log in</span></p>

            {showLogin && <Login />}
            {showRegister && <Register />}

        </div>
    );
};

export default Discussion;