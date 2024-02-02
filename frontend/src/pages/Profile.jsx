// Contains bottom nav and body (conversations, etc)
import ProfileHeader from '../components/ProfileHeader' // Top Nav bar
import ProfileContent from '../components/ProfileContent'


// render profile if logged in
export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <ProfileContent />
    </>
  )
}
