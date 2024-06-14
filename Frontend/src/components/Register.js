import React, { useState } from 'react';



const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Register logic using your API endpoint
        try {
            const response = await fetch('http://localhost:5000/api/discussion/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json()
            console.log(data);


            if (data.success) {
                setShowToast(true);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    setShowToast(false);
                }, 5000);
            } else {
                setError(data.message || 'An error occurred. Please try again.');
            }


        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '15px auto' }}>
            <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Register</h2>
            {showToast && (
                <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1', minWidth: '300px', borderRadius: '8px' }}>
                    <div className="toast-header bg-success text-white">
                        <strong className="me-auto">Success</strong>
                        <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)} aria-label="Close"></button>
                    </div>
                    <div className="toast-body" style={{ backgroundColor: '#f8f9fa', color: '#6c757d', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '0 0 8px 8px' }}>
                        Registration successful! Redirecting...
                    </div>
                </div>
            )}
            {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Register</button>
                </div>

            </form>
        </div>
    );
};

export default Register;

