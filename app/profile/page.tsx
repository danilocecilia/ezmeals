import React from 'react'
import { auth } from '@root/auth'
import ProfileForm from './Form'

const UserProfile = async () => {
  const session = await auth()

  const user = session?.user
  return (
    <div className="user-profile">
      <ProfileForm user={user} />
    </div>
  )
}

export default UserProfile
