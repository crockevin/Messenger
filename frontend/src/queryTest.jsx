import { useEffect, useState } from 'react'
import { QUERY_USERS } from './utlis/queries'
import { useQuery } from '@apollo/client'



function App() {
  const { loading, data } = useQuery(QUERY_USERS)

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      {data && data.users.map((user) => (
        <div key={user._id}>{user.username}</div>
      ))}
    </>
  );
}

export default App
