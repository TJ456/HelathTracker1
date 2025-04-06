import React from 'react';
import UserInfo from '../../components/profile/UserInfo/UserInfo'; // Correct path
import HealthHistory from '../../components/profile/HealthHistory/HealthHistory'; // Correct path
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <UserInfo />
      <HealthHistory />
    </div>
  );
};

export default Profile;