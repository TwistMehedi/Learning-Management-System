import React from 'react'
import { useSelector } from 'react-redux'

const ProfileInstructor = () => {
  const {user} = useSelector((state)=> state.user);
  const profile = user?.user;
  
  return (
    <div>
       {profile && profile.role === "instructor" ? (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-semibold mb-4 text-center">👤 User Profile</h2>

      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name: </span>
          {profile?.name || 'N/A'}
        </div>

        <div>
          <span className="font-semibold">Email: </span>
          {profile?.email || 'N/A'}
        </div>

        <div>
          <span className="font-semibold">Phone: </span>
          {profile?.phone || 'N/A'}
        </div>

        <div>
          <span className="font-semibold">Role: </span>
          {profile?.role || 'N/A'}
        </div>

        <div>
          <span className="font-semibold">Verified: </span>
          {profile?.isVerified ? '✅ Verified' : '❌ Not Verified'}
        </div>

        <div>
          <span className="font-semibold">Bio: </span>
          {profile?.bio || 'Not set'}
        </div>

        <div>
          <span className="font-semibold">Created At: </span>
          {new Date(profile?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
       ):(<p className="text-center mt-10">You are not instructor</p>)}
    </div>
  )
}

export default ProfileInstructor
