import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileContent from '../components/ProfileContent';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_USER } from '../utlis/queries';

export default function Profile() {
  const { id } = useParams(); // retrieve value of the route param `:id`
  console.log('UserID from URL:', id); // Log extracted user id

  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    // Pass  `id` URL parameter into query to retrieve this data associated with 'id'
    variables: { _id: id },
  });

  if (loading) {
    console.log('LOADING...')
    return <p>Loading...</p>;

  }

  if (error) {
    console.error('GraphQL error:', error); // Log any GraphQL errors
    return <p>❌ Error fetching user data ❌</p>;
  }

  const user = data?.user || {};

  return (
    <>
      <ProfileHeader />
      <ProfileContent />
      {user ? (
        <Typography align="center" variant="h6">
          Welcome, {user.username}! ✅
        </Typography>
      ) : (
        <p>❌ User not found ❌</p>
      )}
    </>
  );
}

