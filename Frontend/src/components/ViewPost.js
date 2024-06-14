import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/discussion/post/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }

                const postData = await response.json();
                setPost(postData);

                // Fetch user information using the user ID from the post
                const userResponse = await fetch(`http://localhost:5000/api/discussion/auth/${postData.user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user information');
                }

                const userData = await userResponse.json();
                setUserName(userData.name); // Set the user's name

            } catch (error) {
                console.error('Error fetching post and user:', error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post || !userName) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <span
                onClick={() => navigate('/postlist')}
                className="inline-block mb-4 text-blue-500 cursor-pointer hover:underline"
            >
                Back to Posts
            </span>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-lg mb-6">{post.question}</p>
                <span
                    className="inline-block text-blue-500 cursor-pointer hover:underline font-bold ml-4"
                    style={{ fontSize: '1rem', color: 'black' }}
                >
                    Reply
                </span>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Posted by: <span className="font-medium text-gray-700">{userName}</span></span>
                    <span>Date: {new Date(post.date).toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;
