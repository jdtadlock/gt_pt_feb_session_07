import React from 'react';

const Profile = props => (
  <div className="landing">
    <h1>Profile</h1>

    <h2>Name: {props.user.name ? props.user.name : 'You haven\'t store your name yet'}</h2>
    <h3>Email: {props.user.email}</h3>
    <button onClick={() => props.toggleModal(true)}>Update Profile</button>
  </div>
);

export default Profile;