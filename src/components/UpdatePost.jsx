import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const UpdatePost = ({ closeModal }) => {
  const { id } = useParams(); // Used to get the post ID from the route parameters
  console.log(id)
  const [loading, setLoading] = useState(true); // Loading state for categories and post data
  const [error, setError] = useState(null); // Error state for data fetching
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    tag: "",
    content: "",
  });
  const [submitError, setSubmitError] = useState(null); // Error state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false); // Submitting state
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors

  const navigate = useNavigate();

  useEffect(() => {
   
    // Fetch post data to update
    axios.get(`http://localhost:4000/posts/${id}`)
      .then((response) => {
        setFormData({
          title: response.data.title || "",
          imageUrl: response.data.imageUrl || "",
          tag: response.data.tag || "",
          content: response.data.content || "",
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }

    if (!formData.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required.";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(formData.imageUrl)) {
      errors.imageUrl = "Image URL must be a valid image URL (jpg, jpeg, png, gif, bmp, webp).";
    }

    if (!formData.tag) {
      errors.tag = "Tag is required.";
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not proceed with the submission.
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Update the existing post
    axios.patch(`http://localhost:4000/posts/${id}`, formData)
      .then(() => {
        alert('Post updated successfully!');
        setValidationErrors({});
        if (closeModal) {
          closeModal(); // Close modal after submission if in a modal
        } else {
          navigate(`/`); // Navigate to the home
        }
      })
      .catch((error) => {
        setSubmitError(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center text-center text-[15px] rounded-xl text-gray-400 bg-gray-900 p-4'>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center text-center text-[15px] rounded-xl text-gray-400 bg-gray-900 p-4'>
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center text-gray-300 font-bold mt-10">
        Update Post
      </h1>
      <form
        className="flex flex-col justify-center gap-2 my-10"
        method="post"
        onSubmit={handleSubmit}
      >
        {submitError && (
          <div className="bg-red-950 text-red-100 p-2 border border-red-700">
            <small>{submitError}</small>
          </div>
        )}

        {validationErrors.title && (
          <small className="text-red-500 text-sm">{validationErrors.title}</small>
        )}
        <input
          className="w-full h-10 px-2 outline-none rounded-md text-gray-400 placeholder:text-gray-700 bg-gray-900"
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        {validationErrors.imageUrl && (
          <small className="text-red-500 text-sm">{validationErrors.imageUrl}</small>
        )}
        <input
          className="w-full h-10 px-2 outline-none rounded-md text-gray-400 placeholder:text-gray-700 bg-gray-900"
          placeholder="Image URL"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        {validationErrors.tag && (
          <small className="text-red-500 text-sm">{validationErrors.tag}</small>
        )}
        <input
          className="w-full h-10 px-2 outline-none rounded-md text-gray-400 placeholder:text-gray-700 bg-gray-900"
          placeholder="Tags"
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        />
        

        {validationErrors.content && (
          <small className="text-red-500 text-sm">{validationErrors.content}</small>
        )}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full min-h-[150px] p-2 outline-none rounded-md text-gray-400 placeholder:text-gray-700 bg-gray-900"
        ></textarea>

        <button
          type="submit"
          className="w-full h-10 px-2 outline-none rounded-md font-semibold text-gray-900 bg-[#f8f296]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

UpdatePost.propTypes = {
  closeModal: PropTypes.func, // Optional onClose prop
};

export default UpdatePost;
