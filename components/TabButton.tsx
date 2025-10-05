import React from 'react';

interface TabButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ label, onClick, isActive }) => {
  const activeClasses = 'bg-cyan-500 text-white';
  const inactiveClasses = 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
