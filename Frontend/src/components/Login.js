import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Login logic using your API endpoint
        try {
            const response = await fetch('http://localhost:5000/api/discussion/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                localStorage.setItem('token', data.authtoken);
                navigate('/postlist', { state: { authToken: data.authtoken } }); // Navigate to PostList with authToken as state
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '25px auto', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center' }}>Login</h2>

            {/* Bootstrap Toast Notification */}
            {showToast && (
                <div className="toast show " role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', bottom: '20px', right: '100px', zIndex: '1', minWidth: '300px', backgroundColor: '#f8f9fa', color: '#6c757d', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: ' 8px' }}>
                    <div className="toast-header bg-success text-black">
                        <strong className="me-auto">Success</strong>
                        <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)} aria-label="Close"></button>
                    </div>
                    <div className="toast-body" >

                        Login successful! Redirecting...
                    </div>
                </div>
            )}

            {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Login</button>

                </div>
            </form>
        </div>
    );
};

export default Login;
