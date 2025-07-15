"use client";

import { useState, useEffect } from 'react';
import { SimpleVisitorForm } from "../../../../components/SimpleVisitorForm";
import { SimpleVisitorCard } from "../../../../components/SimpleVisitorCard";

export default function Day7Session1Demo() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch visitors from API
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/visitors');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch visitors');
      }

      setVisitors(data.visitors || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load visitors on component mount
  useEffect(() => {
    fetchVisitors();
  }, []);

  // Handle new visitor added
  const handleVisitorAdded = (newVisitor) => {
    setVisitors(prev => [newVisitor, ...prev]);
  };

  // Handle visitor updated
  const handleVisitorUpdated = (updatedVisitor) => {
    setVisitors(prev => 
      prev.map(visitor => 
        visitor.id === updatedVisitor.id ? updatedVisitor : visitor
      )
    );
  };

  // Handle visitor deleted
  const handleVisitorDeleted = (deletedId) => {
    setVisitors(prev => prev.filter(visitor => visitor.id !== deletedId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 API Route Handlers Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete working example demonstrating Next.js API Route Handlers with full CRUD operations. 
            Add, view, edit, and delete messages in real-time!
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Create</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">POST /api/visitors</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-2">👀</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Read</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">GET /api/visitors</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Update</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">PUT /api/visitors/[id]</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-2">🗑️</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Delete</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">DELETE /api/visitors/[id]</p>
          </div>
        </div>

        {/* Add New Visitor Form */}
        <div className="mb-8">
          <SimpleVisitorForm onVisitorAdded={handleVisitorAdded} />
        </div>

        {/* Visitors List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              💬 Recent Messages
            </h2>
            <button
              onClick={fetchVisitors}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 dark:text-gray-400">Loading messages...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                <span className="text-red-700 dark:text-red-300">Error: {error}</span>
              </div>
              <button
                onClick={fetchVisitors}
                className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Visitors Grid */}
          {!loading && !error && (
            <>
              {visitors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visitors.map((visitor) => (
                    <SimpleVisitorCard
                      key={visitor.id}
                      visitor={visitor}
                      onVisitorUpdated={handleVisitorUpdated}
                      onVisitorDeleted={handleVisitorDeleted}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💭</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No messages yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Be the first to leave a message!
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* API Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📚 API Endpoints - Click to Test!
          </h3>
          
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400">
                  GET /api/visitors
                </h4>
                <a
                  href="/api/visitors"
                  target="_blank"
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Test GET
                </a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Retrieve all visitors. Returns an array of visitor objects.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">
                  POST /api/visitors
                </h4>
                <button
                  onClick={() => {
                    const testData = { name: "Test User", message: "This is a test message from the API documentation!" };
                    fetch('/api/visitors', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(testData)
                    })
                    .then(r => r.json())
                    .then(data => {
                      alert('POST Response: ' + JSON.stringify(data, null, 2));
                      fetchVisitors(); // Refresh the list
                    })
                    .catch(err => alert('Error: ' + err.message));
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Test POST
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add a new visitor. Requires JSON body with `name` and `message` fields.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">
                  PUT /api/visitors/[id]
                </h4>
                <button
                  onClick={() => {
                    const id = prompt('Enter visitor ID to update (e.g., 1, 2, 3):');
                    if (id) {
                      const testData = { name: "Updated User", message: "This message was updated via API!" };
                      fetch(`/api/visitors/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(testData)
                      })
                      .then(r => r.json())
                      .then(data => {
                        alert('PUT Response: ' + JSON.stringify(data, null, 2));
                        fetchVisitors(); // Refresh the list
                      })
                      .catch(err => alert('Error: ' + err.message));
                    }
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                >
                  Test PUT
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update an existing visitor. Requires JSON body with `name` and `message` fields.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-600 dark:text-red-400">
                  DELETE /api/visitors/[id]
                </h4>
                <button
                  onClick={() => {
                    const id = prompt('Enter visitor ID to delete (e.g., 1, 2, 3):');
                    if (id && confirm(`Are you sure you want to delete visitor ${id}?`)) {
                      fetch(`/api/visitors/${id}`, {
                        method: 'DELETE'
                      })
                      .then(r => r.json())
                      .then(data => {
                        alert('DELETE Response: ' + JSON.stringify(data, null, 2));
                        fetchVisitors(); // Refresh the list
                      })
                      .catch(err => alert('Error: ' + err.message));
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Test DELETE
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Delete a visitor by ID. Returns success message.
              </p>
            </div>
          </div>

          {/* Additional Test Endpoints */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              🧪 Other Demo Endpoints
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">GET /api/hello</span>
                  <a
                    href="/api/hello"
                    target="_blank"
                    className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                  >
                    Test
                  </a>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Basic hello endpoint</p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">GET /api/greet</span>
                  <a
                    href="/api/greet"
                    target="_blank"
                    className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                  >
                    Test
                  </a>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Simple greeting endpoint</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span>Built with Next.js 15 API Route Handlers</span>
          </div>
          <div className="mt-2">
            <a
              href="/"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}