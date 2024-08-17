import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdatePost from "../components/UpdatePost"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const SinglePost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                setError(error.message);
                navigate('/*')
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]); // Re-fetch if the id changes

    const deletePost = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/posts/${id}`);
            // Redirect or update UI after deletion
            if(res){
                navigate('/posts')
            }
            
        } catch (error) {
            setError(error.message);
        }
    };

    const editPost = () => {
        // Handle post editing (e.g., navigate to an edit page)
        navigate(`/post/${post._id}`);
        setIsOpenModal(true)
    };

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="bg-gray-950">
            <Navbar />
            {post && (
                <>
                    <div className="max-w-[1200px] m-auto h-96 overflow-hidden rounded-b-3xl">
                        <img
                            className="w-full h-full object-cover"
                            src={post.imageUrl}
                            alt={post.title.slice(0,10)}
                        />
                    </div>

                    <div className="max-w-[1200px] m-auto gap-10 flex flex-col md:flex-row mt-14 px-3">
                        <div className="">
                            <h1 className="text-3xl font-bold text-gray-100 mb-6">
                                {post.title}
                            </h1>
                            <p className="text-gray-100 text-justify">
                                {post.content}
                            </p>
                            <div className="flex gap-3 my-10">
                                <button
                                    onClick={deletePost}
                                    className="bg-red-300 flex gap-2 items-center text-gray-900 px-4 py-2 mb-5 rounded-lg"
                                >
                                    <i className="fi fi-rr-trash translate-y-0.5"></i> Delete
                                </button>
                                <button
                                    onClick={editPost}
                                    className="bg-gray-700 flex gap-2 items-center text-gray-200 px-4 py-2 mb-5 rounded-lg"
                                >
                                    <i className="fi fi-rr-edit translate-y-0.5"></i> Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        isOpenModal &&
                        <Modal>
                            <UpdatePost/>
                        </Modal>
                    }

                </>
            )}
            <Footer />
        </div>
    );
};

export default SinglePost;
