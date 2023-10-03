import React from 'react';
import Navbar from './Sidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;