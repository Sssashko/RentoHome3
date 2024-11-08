// src/components/ProfilePage.tsx

import React from 'react';

type ProfilePageProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ avatarUrl, name, bio, followers, following, posts }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
      />

      {/* Name */}
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">{name}</h1>

      {/* Bio */}
      <p className="mt-2 text-gray-600 text-center max-w-md">{bio}</p>

      {/* Stats */}
      <div className="flex mt-6 space-x-8">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">{followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">{following}</p>
          <p className="text-gray-500">Following</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">{posts}</p>
          <p className="text-gray-500">Posts</p>
        </div>
      </div>

      {/* Button */}
      <button className="mt-8 px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600">
        Follow
      </button>
    </div>
  );
};

export default ProfilePage;
