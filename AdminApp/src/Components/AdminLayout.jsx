// src/Components/AdminLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-56 flex flex-col">
        {/* Fixed Header */}
        <Header />

        {/* Scrollable page content */}
        <main className="flex-1 mt-16 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
