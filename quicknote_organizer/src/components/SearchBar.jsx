import { useState } from 'react';

/**
 * SearchBar component for filtering notes
 */
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className="search-container">
      <div style={{ position: 'relative' }}>
        <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '14px', color: '#666' }}></i>
        <input
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={handleSearch}
          style={{ paddingLeft: '36px' }}
        />
        {query && (
          <button 
            className="btn-icon" 
            onClick={handleClear}
            style={{ position: 'absolute', right: '8px', top: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <i className="fas fa-times" aria-hidden="true"></i>
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    </div>
  );
}
