// src/components/ProfilePage.tsx

import React, { useState } from 'react';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';

type ProfilePageProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ avatarUrl, name, bio, followers, following, posts }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex flex-col items-center p-8 rounded-lg bg-neutral-700 text-white min-h-screen">
      {/* Avatar */}
      <div className="relative">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md">
          {isFollowing ? <FcLike size={24} /> : <FcLikePlaceholder size={24} />}
        </div>
      </div>

      {/* Name */}
      <h1 className="mt-4 text-3xl font-bold text-white">{name}</h1>

      {/* Bio */}
      <p className="mt-2 text-gray-300 text-center max-w-md px-4">{bio}</p>

      {/* Stats */}
      <div className="flex mt-6 space-x-8 w-full justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-white">{followers.toLocaleString()}</p>
          <p className="text-white">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-white">{following.toLocaleString()}</p>
          <p className="text-white">Following</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-white">{posts.toLocaleString()}</p>
          <p className="text-white">Posts</p>
        </div>
      </div>

      {/* Follow/Unfollow Button */}
      <button
        onClick={toggleFollow}
        className={`mt-8 px-6 py-2 rounded-lg shadow transition ${
          isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-semibold`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default ProfilePage;
