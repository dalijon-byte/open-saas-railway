import React from 'react';
import { useAuth } from 'wasp/client/auth';

const DashboardPage = () => {
  const { data: user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dalisoft!</h1>
      {user && (
        <p>
          Hello, {user.identities.google?.profile.name || user.email}!
        </p>
      )}
    </div>
  );
};

export default DashboardPage;
