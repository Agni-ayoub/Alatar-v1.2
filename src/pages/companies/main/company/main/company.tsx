import React from 'react';
import { Outlet } from 'react-router-dom';

const Company : React.FC = () => {
  return (
    <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
      <Outlet />
    </div>
  );
};

export default Company;
