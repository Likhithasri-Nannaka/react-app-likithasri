import React from 'react';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong> First Name : </strong> {user.user_firstname}</p>
          <p><strong> Last Name : </strong> {user.user_lastname}</p>
          <p><strong> Email : </strong> {user.user_email}</p>
          <p><strong> Phone : </strong> {user.user_phone}</p>
          <p><strong> City : </strong> {user.user_city}</p>
          <p><strong> Zipcode : </strong> {user.user_zipcode}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Dashboard;
