'use client';

import { useState, useEffect } from 'react';
import { VisitorCard } from './VisitorCard';

export function VisitorList({ refreshTrigger }) {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch visitors function
  const fetchVisitors = async (page = 1, search = '', sort = 'timestamp', order = 'desc') => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        sortBy: sort,
        sortOrder: order
      });

      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/visitors?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch visitors');
      }

      setVisitors(data.visitors);
      setPagination(data.pagination);
      setCurrentPage(data.pagination.currentPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and refresh when refreshTrigger changes
  useEffect(() => {
    fetchVisitors(currentPage, searchTerm, sortBy, sortOrder);
  }, [refreshTrigger]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchVisitors(1, searchTerm, sortBy, sortOrder);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Auto-search with debounce
    if (value === '') {
      setCurrentPage(1);
      fetchVisitors(1, '', sortBy, sortOrder);
    }
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    let newOrder = 'desc';
    if (sortBy === newSortBy && sortOrder === 'desc') {
      newOrder = 'asc';
    }
    
    setSortBy(newSortBy);
    setSortOrder(newOrder);
    setCurrentPage(1);
    fetchVisitors(1, searchTerm, newSortBy, newOrder);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchVisitors(page, searchTerm, sortBy, sortOrder);
  };

  // Handle visitor update
  const handleVisitorUpdated = (updatedVisitor) => {
    setVisitors(prev => 
      prev.map(visitor => 
        visitor.id === updatedVisitor.id ? updatedVisitor : visitor
      )
    );
  };

  // Handle visitor deletion
  const handleVisitorDeleted = (deletedId) => {
    setVisitors(prev => prev.filter(visitor => visitor.id !== deletedId));
    // Refresh to update pagination
    fetchVisitors(currentPage, searchTerm, sortBy, sortOrder);
  };

  if (loading && visitors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading visitors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📖 Guestbook Entries
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {pagination.totalItems} {pagination.totalItems === 1 ? 'visitor' : 'visitors'}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search visitors..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>

        {/* Sort Options */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('timestamp')}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              sortBy === 'timestamp' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Date {sortBy === 'timestamp' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('name')}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              sortBy === 'name' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md p-4">
          <p className="text-red-700 dark:text-red-300">Error: {error}</p>
          <button
            onClick={() => fetchVisitors(currentPage, searchTerm, sortBy, sortOrder)}
            className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Visitors Grid */}
      {visitors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visitors.map((visitor) => (
            <VisitorCard
              key={visitor.id}
              visitor={visitor}
              onVisitorUpdated={handleVisitorUpdated}
              onVisitorDeleted={handleVisitorDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No visitors found' : 'No visitors yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? `No visitors match "${searchTerm}". Try a different search term.`
              : 'Be the first to sign the guestbook!'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev || loading}
            className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={loading}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext || loading}
            className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && visitors.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}