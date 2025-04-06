import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = ({ isAuthenticated, setIsAuthenticated }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profilePic, setProfilePic] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsAuthenticated(true);
    alert(isLogin ? 'Logged in successfully!' : 'Registered successfully!');
    navigate('/dashboard');
  };

  const handleAuthSwitch = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="user-auth-container">
      {isAuthenticated ? (
        <div className="user-info">
          <h2>User Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-pic-upload">
              <label htmlFor="profile-pic">
                <div className="profile-pic-preview">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" />
                  ) : (
                    <div className="profile-initials">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="update-btn">Update Profile</button>
            <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
          </form>
        </div>
      ) : (
        <div className="auth-form">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className="auth-btn">
              {isLogin ? 'Login' : 'Register'}
            </button>
            <div className="auth-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={handleAuthSwitch} className="switch-btn">
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserInfo;