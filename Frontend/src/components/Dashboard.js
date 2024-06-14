import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa'; // Importing the heart icon from react-icons/fa

const Discussion = () => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [reply, setReply] = useState("");
    const [posts, setPosts] = useState([]);
    const [questionError, setQuestionError] = useState("");

    // Load liked posts from local storage
    const [likedPosts, setLikedPosts] = useState(() => {
        const storedLikedPosts = localStorage.getItem("likedPosts");
        return storedLikedPosts ? JSON.parse(storedLikedPosts) : {};
    });

    // Save liked posts to local storage
    useEffect(() => {
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    }, [likedPosts]);

    const handlePostQuestion = () => {
        if (!username || !title || !question) {
            setQuestionError("Please enter username, title, and question");
            return;
        }

        const newPost = {
            id: posts.length + 1,
            username: username,
            title: title,
            question: question,
            date: new Date().toLocaleString(),
            replies: [],
            showReplyTextarea: false,
            showAllReplies: false,
        };
        setPosts([newPost, ...posts]);
        setUsername("");
        setTitle("");
        setQuestion("");
        setQuestionError("");
    };

    const handleReply = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, showReplyTextarea: true } : post
        );
        setPosts(updatedPosts);
    };

    const handlePostReply = (postId) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    replies: [
                        ...post.replies,
                        {
                            id: post.replies.length + 1,
                            username: username,
                            message: reply,
                            date: new Date().toLocaleString(),
                            likes: 0, // Set default like count to 0
                        },
                    ],
                    showReplyTextarea: false,
                };
            } else {
                return post;
            }
        });
        setPosts(updatedPosts);
        setReply("");
    };

    const handleLikeReply = (postId, replyId) => {
        const isLiked = likedPosts[postId] && likedPosts[postId][replyId];
        const updatedLikedPosts = {
            ...likedPosts,
            [postId]: { ...likedPosts[postId], [replyId]: !isLiked },
        };
        setLikedPosts(updatedLikedPosts);

        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                const updatedReplies = post.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return { ...reply, likes: isLiked ? 0 : 1 };
                    } else {
                        return reply;
                    }
                });
                return { ...post, replies: updatedReplies };
            } else {
                return post;
            }
        });
        setPosts(updatedPosts);
    };

    const toggleAllReplies = (postId) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return { ...post, showAllReplies: !post.showAllReplies };
            } else {
                return post;
            }
        });
        setPosts(updatedPosts);
    };


    return (
        <div className="font-poppins">
            <h1 className="text-3xl font-bold p-4 ml-2">Discussion</h1>
            <hr className="h-px bg-black border-0 mx-4"></hr>
            <div className="flex justify-between mt-3">

                <div className="w-1/2 mx-4 mt-20">
                    <div className="bg-white shadow-md rounded-md p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <img
                                src="https://www.pngitem.com/pimgs/m/20-203432_profile-icon-png-image-free-download-searchpng-ville.png"
                                alt="User Icon"
                                className="w-8 h-8 mr-2"
                            />
                            <p className="text-lg font-semibold">{username}</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                        />
                        <textarea
                            placeholder="Your Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                        ></textarea>
                        <button
                            onClick={handlePostQuestion}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        {questionError && (
                            <p className="text-red-500 mt-2">{questionError}</p>
                        )}
                    </div>
                </div>
                <div className="mx-4 w-1/2">
                    <div className="h-full overflow-y-auto pb-2" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white shadow-md rounded-md p-4 mb-4"
                            >
                                <div className="bg-blue-100 rounded-md px-4 py-2 mb-4">
                                    <p className="text-gray-600 mb-2">
                                        Posted by: {post.username}
                                    </p>
                                    <p className="text-gray-600 mb-2">Date: {post.date}</p>
                                    <h3 className="text-lg font-semibold mb-2">Title :{post.title}</h3>
                                    <p className="text-gray-600 mb-2">Question: {post.question}</p>
                                </div>
                                {post.showReplyTextarea && (
                                    <div className="mb-2">
                                        <textarea
                                            placeholder="Your Reply"
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                                        ></textarea>
                                        <button
                                            onClick={() => handlePostReply(post.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            Post Reply
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleReply(post.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Reply
                                </button>
                                <div className="mt-4">
                                    {post.replies.slice(0, 2).map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="border-t border-gray-300 pt-4"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src="/images/user.png"
                                                    alt="User Icon"
                                                    className="w-6 h-6 mr-2"
                                                />
                                                <p className="text-gray-600">{reply.username}</p>
                                                <button


                                                    onClick={() => handleLikeReply(post.id, reply.id)}
                                                    className={`ml-auto bg-gray-200 px-2 py-1 rounded-full flex items-center ${likedPosts[post.id] &&
                                                        likedPosts[post.id][reply.id]
                                                        }`}
                                                >
                                                    <FaHeart className="text-red-500 mr-1" />
                                                    <span className="text-red-500">{reply.likes}</span>
                                                </button>
                                            </div>
                                            <p className="text-gray-600">Date: {reply.date}</p>
                                            <p>{reply.message}</p>
                                        </div>
                                    ))}
                                    {post.replies.length > 2 && (
                                        <button
                                            onClick={() => toggleAllReplies(post.id)}
                                            className="text-blue-500 mt-2 cursor-pointer"
                                        >
                                            {post.showAllReplies ? "Hide all Replies" : "Show all Replies"}
                                        </button>
                                    )}
                                    {post.showAllReplies &&
                                        post.replies.slice(2).map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="border-t border-gray-300 pt-4"
                                            >
                                                <div className="flex items-center">
                                                    <img
                                                        src="/images/user.png"
                                                        alt="User Icon"
                                                        className="w-6 h-6 mr-2"
                                                    />
                                                    <p className="text-gray-600">{reply.username}</p>
                                                    <button
                                                        onClick={() =>
                                                            handleLikeReply(post.id, reply.id)
                                                        }
                                                        className={`ml-auto bg-gray-200 px-2 py-1 rounded-full flex items-center ${likedPosts[post.id] &&
                                                            likedPosts[post.id][reply.id]
                                                            }`}
                                                    >
                                                        <FaHeart className="text-red-500 mr-1" />
                                                        <span className="text-red-500">{reply.likes}</span>
                                                    </button>
                                                </div>
                                                <p className="text-gray-600">Date: {reply.date}</p>
                                                <p>{reply.message}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Discussion;