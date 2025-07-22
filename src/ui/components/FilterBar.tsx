import React, { useState } from 'react';

interface FilterBarProps {
  onFilter: (status: 'all' | 'pending' | 'completed') => void;
  onSearch: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value as 'all' | 'pending' | 'completed');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
      <select
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-lg text-gray-700"
        defaultValue="all"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by title or description"
        className="p-2 border border-gray-300 rounded-lg flex-1 text-gray-700"
      />
    </div>
  );
};

export default FilterBar;