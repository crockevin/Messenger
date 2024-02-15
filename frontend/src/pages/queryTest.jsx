import React, { useState } from 'react';
import Auth from '../utils/auth'

const UploadForm = () => {
  const id = Auth.getProfile().data._id
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', id);

    try {
      const response = await fetch('/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const responseData = await response.json();
      console.log(responseData);
      alert(responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };
  console.log(id)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src='/uploads/65c8404a5808ba7d44be39d80.5grid.png' />
        <label htmlFor="pfp">Select File:</label>
        <input type="file" id="pfp" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;