import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from './Post';

const Posts = ({ onPostClick }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

    useEffect(() => {
        axios.get('http://localhost:4000/posts/')
          .then((response) => {
            setPosts(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center text-center text-[15px] rounded-xl text-gray-400 bg-gray-900 p-4'>
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center text-center text-[15px] rounded-xl text-gray-400 bg-gray-900 p-4'>
        {error.message || 'An error occurred while fetching posts.'}
      </div>
    );
  }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {posts.map((data) => (
                <Post
                key={data.id}
                title={data.title}
                thumbnail={data.imageUrl}
                content={data.content}
                tag={data.tag}
                date={data.dateCreated}
                onClick={() => onPostClick(data)}
                />
            ))}
        </div>
    );
}

// Define prop types for the Post component
Posts.propTypes = {
  onPostClick: PropTypes.func,
}

export default Posts;
