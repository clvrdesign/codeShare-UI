import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";
import Modal from "../components/Modal";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`); // Navigate to SinglePost with post ID
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
        <h1 className="max-w-[750px] mb-4 text-center lg:text-4xl text-xl text-gray-900 font-semibold">
          Your Hub for the Latest in Development News and Features
        </h1>
        <p className="max-w-[650px] text-center lg:text-lg text-[15px] text-gray-900">
          Stay up-to-date with the latest developments in the world of technology and software development.
        </p>
      </Header>

      <div className="w-full py-10">
        <div className="max-w-[1200px] m-auto flex flex-col items-center px-3">
          <h1 className="lg:text-3xl text-2xl font-bold text-center text-gray-300 m-10">
            Latest posts
          </h1>
          <Posts onPostClick={handlePostClick} limit={3} />
          <Link
            to="/posts"
            className="flex justify-center items-center text-center h-10 w-fit px-10 bg-[#f8f296] text-gray-800 my-10 rounded-full"
          >
            View all posts
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
