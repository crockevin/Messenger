import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { DeleteUser } from '../utlis/mutation'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileFooterNav from '../components/Profile/ProfileFooterNav'
import Auth from '../utlis/auth'
import { useNavigate } from 'react-router-dom'


const Settings = () => {
  const id = Auth.getProfile().data._id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteUser] = useMutation(DeleteUser, {
    variables: { userId: id }
  });
  const navigate = useNavigate()
  const handleDeleteUser = async () => {
    setLoading(true);
    setError(null);

    const confirm = window.confirm('This action cannot be undone, are you sure you want to proceed?')

    if (confirm) {
      try {
        await deleteUser();
        console.log("User deleted successfully");
        navigate('/')
      } catch (error) {
        setError(error);
        console.error("Error deleting user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <ProfileHeader />
      <h2>Settings</h2>
      <button onClick={handleDeleteUser} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete User'}
      </button>
      {error && <p>Error: {error.message}</p>}
      <ProfileFooterNav />
    </div>
  );
};

export default Settings;