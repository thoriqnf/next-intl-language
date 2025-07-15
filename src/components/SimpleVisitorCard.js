'use client';

import { useState } from 'react';

export function SimpleVisitorCard({ visitor, onVisitorUpdated, onVisitorDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(visitor.name);
  const [editMessage, setEditMessage] = useState(visitor.message);
  const [isLoading, setIsLoading] = useState(false);

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle edit save
  const handleSaveEdit = async () => {
    if (!editName.trim() || !editMessage.trim()) {
      alert('Name and message are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/visitors/${visitor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName.trim(),
          message: editMessage.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update');
      }

      // Update the visitor in the parent component
      const updatedVisitor = {
        ...visitor,
        name: editName.trim(),
        message: editMessage.trim(),
        timestamp: new Date().toISOString(),
        avatar: '✨' // Show it was updated
      };

      if (onVisitorUpdated) {
        onVisitorUpdated(updatedVisitor);
      }

      setIsEditing(false);
    } catch (error) {
      alert('Error updating: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/visitors/${visitor.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete');
      }

      if (onVisitorDeleted) {
        onVisitorDeleted(visitor.id);
      }
    } catch (error) {
      alert('Error deleting: ' + error.message);
      setIsLoading(false);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditName(visitor.name);
    setEditMessage(visitor.message);
    setIsEditing(false);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 ${isLoading ? 'opacity-50' : ''}`}>
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Display Mode
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{visitor.avatar}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {visitor.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(visitor.timestamp)}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="mb-3">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {visitor.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}