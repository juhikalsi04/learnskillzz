import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const PostList = () => {
    const { postId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [questionData, setQuestionData] = useState({
        title: '',
        description: ''
    });
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const authToken = location.state?.authToken;

    useEffect(() => {
        if (!authToken) {
            console.error('Auth token is missing.');
            navigate('/login');
            return;
        }
        fetchUserInfo(authToken);
        fetchAllPosts();
    }, [authToken, navigate]);

    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/discussion/auth/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const userData = await response.json();
            setUsername(userData.name);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const fetchAllPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/discussion/post/allpost', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const postsData = await response.json();
            const updatedPostsData = await Promise.all(postsData.map(async (post) => {
                const userResponse = await fetch(`http://localhost:5000/api/discussion/auth/${post.user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${authToken}`
                    }
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user');
                }

                const userData = await userResponse.json();
                return {
                    ...post,
                    user: userData.name
                };
            }));

            const sortedPosts = updatedPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRepliesForPost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/discussion/reply/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch replies for post');
            }

            const replyData = await response.json();
            return replyData;
        } catch (error) {
            console.error('Error fetching replies for post:', error);
            return [];
        }
    };

    const fetchPostById = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/discussion/post/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }

            const postData = await response.json();

            const userResponse = await fetch(`http://localhost:5000/api/discussion/auth/${postData.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": `${authToken}`
                },
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userData = await userResponse.json();
            const replies = await fetchRepliesForPost(postId);

            setSelectedPost({ ...postData, userName: userData.name, replies: replies });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({
            ...questionData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            if (!authToken) {
                console.error('Auth token is missing.');
                return;
            }

            const postData = {
                title: questionData.title,
                question: questionData.description
            };

            const response = await fetch('http://localhost:5000/api/discussion/post/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${authToken}`
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                setShowPopup(false);
                setQuestionData({
                    title: '',
                    description: ''
                });
                console.log('Question data posted successfully.');
                fetchAllPosts();
            } else {
                console.error('Error posting question data:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting question data:', error);
        }
    };

    const handleViewPost = (postId) => {
        fetchPostById(postId);
    };

    const handleBackToPosts = () => {
        setSelectedPost(null);
    };

    const handleReplySubmit = async () => {
        try {
            if (!authToken) {
                console.error('Auth token is missing.');
                return;
            }

            const replyData = {
                postId: selectedPost._id,
                comment: replyContent
            };

            const response = await fetch(`http://localhost:5000/api/discussion/reply/${selectedPost._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${authToken}`
                },
                body: JSON.stringify(replyData)
            });

            if (response.ok) {
                const newReply = {
                    _id: new Date().toISOString(), // Unique ID for the new reply
                    comment: replyContent,
                    time: new Date().toISOString(),
                };

                setSelectedPost(prevState => ({
                    ...prevState,
                    replies: [...prevState.replies, newReply]
                }));

                setReplyContent('');
                setShowReplyBox(false);
                console.log('Reply submitted successfully.');
            } else {
                console.error('Error submitting reply:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Filter posts based on search query
    const filteredPosts = searchQuery
        ? posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : posts;

    // Conditional rendering of the loading screen or content
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border text-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center mx-8 my-10">
            {selectedPost ? (
                <>
                    <span onClick={handleBackToPosts} className="cursor-pointer text-blue-500 hover:underline">
                        &larr; Back to Posts
                    </span>
                    <div className="post-details mt-4 p-6 bg-white rounded-md shadow-md text-left">
                        <h1 className="text-2xl font-bold mb-4">{selectedPost.title}</h1>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-lg mb-2">{selectedPost.question}</p>
                            <span
                                className="text-blue-500 cursor-pointer hover:underline font-bold"
                                style={{ fontSize: '1rem', color: '#1a73e8' }}
                                onClick={() => setShowReplyBox(!showReplyBox)}
                            >
                                Reply
                            </span>
                        </div>
                        {showReplyBox && (
                            <div className="mb-4 my-5">
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="w-full p-2 border rounded mb-2"
                                    placeholder="Write your reply..."
                                    required
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={handleReplySubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                        <p className="text-sm text-gray-600">Posted by: {selectedPost.userName}</p>

                        <p className="text-sm text-gray-600">Date: {new Date(selectedPost.date).toLocaleString()}</p>
                    </div>
                    {selectedPost.replies && selectedPost.replies.map(reply => (
                        <div key={reply._id} className="border p-4 my-4 bg-white rounded-md text-left">
                            <p><strong>{username}</strong> replied to this post:</p>
                            <p className='my-5'>{reply.comment.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</p>
                            <p className="text-sm text-gray-600">Posted on : {formatDate(reply.time)}</p>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mt-4" style={{ marginBottom: '20px' }}>Welcome to LearnSkillz Discussion Forum</h1>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-md px-3 py-2 my-10"
                            style={{ width: "100vh" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <hr className="my-8" />
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Recent Posts</h2>
                        <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-5">Ask a Question</button>
                    </div>
                    <div className="my-8">
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Posted by</th>
                                    <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Discussion Title</th>
                                    <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Date and Time</th>
                                    <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr key={post._id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td scope="row" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{post.user}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '20px 8px', textAlign: 'center' }}>{post.title}</td>
                                        <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{formatDate(post.date)}</td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}><button onClick={() => handleViewPost(post._id)}>View Post</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <hr className="my-8" />
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md" style={{ width: "500px", maxHeight: "80vh", overflowY: "auto" }}>
                        <span onClick={() => setShowPopup(false)} className="cursor-pointer text-blue-500 hover:underline">&larr; Back</span>
                        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
                        <label htmlFor="title" className="block mb-2 text-left">Briefly explain your question here:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={questionData.title}
                            placeholder="Question Title"
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                        />
                        <label htmlFor="description" className="block mb-2 text-left">Describe your question here:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={questionData.description}
                            placeholder="Question Description"
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                            style={{ height: "200px" }}
                        ></textarea>
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostList;
