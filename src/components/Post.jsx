import PropTypes from 'prop-types';

const Post = ({ title, thumbnail, content, tag, date, onClick }) => {

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "week", seconds: 604800 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (let unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return interval === 1 ? `${interval} ${unit.name} ago` : `${interval} ${unit.name}s ago`;
      }
    }
    return "Just now";
  }

  return (
    <div onClick={onClick} className='bg-gray-900 shadow-lg p-4 overflow-hidden rounded-2xl cursor-pointer'>
      <h2 className='text-xl font-semibold text-gray-300'>{title.slice(0,50)}...</h2>
      <div className="relative w-full h-[250px] my-4 overflow-hidden rounded-2xl">
        <small className='absolute top-2 left-2 text-white bg-black bg-opacity-25 py-2 p-4 rounded-xl'>
          {timeAgo(date)}
        </small>
        <img className='w-full h-full object-cover' src={thumbnail} alt={title.slice(0, 10)} />
      </div>
      <small className='block mb-2 text-[#f8f296]'>{tag}</small>
      <p className='text-gray-400'>{content.slice(0, 120)}... <b>(read more)</b></p>
    </div>
  )
}

// Define prop types for the Post component
Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Post;
