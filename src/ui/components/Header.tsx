import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow">
      <h1 className="text-3xl font-bold text-center text-blue-100">Task Manager</h1>
    </header>
  );
};

export default Header;