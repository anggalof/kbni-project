import React from 'react';

const ProtectedComponent = ({ isLoggedIn }: any) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Protected Component</h2>
          <p>This is a protected component. Only accessible after login.</p>
        </div>
      ) : (
        <div>
          <h2>Access Denied</h2>
          <p>Please login to access this component.</p>
        </div>
      )}
    </div>
  );
};

export default ProtectedComponent;