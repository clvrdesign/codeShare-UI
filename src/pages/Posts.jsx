import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost"
import Modal from "../components/Modal";

const AllPosts = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [postsData, setPostsData] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/posts?search=${searchQuery}`);
                setPostsData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchQuery]); // Fetch posts when searchQuery changes

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:4000/posts/${selectedPost._id}`);
            setPostsData(postsData.filter(post => post._id !== selectedPost._id));
            handleCloseModal();
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePostClick = (post) => {
        navigate(`/post/${post._id}`);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="bg-gray-950">
            {modalOpen && (
                <Modal>
                    <CreatePost />
                </Modal>
            )}
            <Navbar createPost={toggleModal} />

            <Header>
                <form action="" className="relative lg:w-[550px] w-[310px] mb-7">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search posts..."
                        aria-label="Search posts"
                        className="w-full h-14 outline-none px-12 rounded-full"
                    />
                    <i className="fi fi-rr-search absolute top-[18px] left-5 text-gray-500"></i>
                </form>
                <p className="max-w-[650px] text-center lg:text-lg text-[15px] text-gray-900">
                    Stay up-to-date with the latest developments in the world of technology and software development.
                </p>
            </Header>

            <div className="w-full py-10">
                <div className="max-w-[1200px] m-auto flex flex-col items-center px-3">
                    {loading ? (
                        <p className="text-white">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <Posts onPostClick={handlePostClick} posts={postsData} />
                    )}
                </div>
            </div>

            {modalOpen && selectedPost && (
                <Modal>
                    <button
                        onClick={handleCloseModal}
                        className="bg-[#f8f296] flex items-center text-gray-900 px-4 py-2 mb-5 rounded-lg"
                    >
                        <i className="fi fi-rr-angle-small-left translate-y-0.5"></i> Back
                    </button>
                    <h2 className="text-2xl mb-4">{selectedPost.title}</h2>
                    <img
                        className="w-full h-[215px] object-cover rounded-2xl"
                        src={selectedPost.imageUrl}
                        alt={selectedPost.title}
                    />
                    <p className="my-4 text-justify">{selectedPost.content}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={deletePost}
                            className="bg-red-300 flex gap-2 items-center text-gray-900 px-4 py-2 mb-5 rounded-lg"
                        >
                            <i className="fi fi-rr-trash translate-y-0.5"></i> Delete
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="bg-gray-700 flex gap-2 items-center text-gray-200 px-4 py-2 mb-5 rounded-lg"
                        >
                            <i className="fi fi-rr-edit translate-y-0.5"></i> Edit
                        </button>
                    </div>
                </Modal>
            )}

            <Footer />
        </div>
    );
};

export default AllPosts;
