import { useState, useEffect } from 'react';
import './UsersList.css';
import { getApiUrl } from '../utils/env';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy API URL từ biến môi trường, fallback về JSONPlaceholder
  const API_URL = getApiUrl();
  const isJSONPlaceholder = API_URL.includes('jsonplaceholder.typicode.com');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/users`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading users from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3 className="error-title">Error Loading Users</h3>
        <p className="error-message">{error}</p>
        <div className="error-api-url">
          API URL: {API_URL}
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <div>
          <h2 className="users-title">Users Directory</h2>
          {isJSONPlaceholder && (
            <div className="api-info">
              Data from JSONPlaceholder API
            </div>
          )}
        </div>
        {isJSONPlaceholder && (
          <div className="api-badge">
            JSONPlaceholder API
          </div>
        )}
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-username">@{user.username}</p>
              </div>
              <div className="user-id">{user.id}</div>
            </div>

            <div className="user-details">
              <div className="user-detail-item">
                <span className="user-detail-icon">📧</span>
                <span className="user-detail-label">Email:</span>
                <a href={`mailto:${user.email}`} className="user-detail-value user-email">
                  {user.email}
                </a>
              </div>

              <div className="user-detail-item">
                <span className="user-detail-icon">📱</span>
                <span className="user-detail-label">Phone:</span>
                <a href={`tel:${user.phone}`} className="user-detail-value">
                  {user.phone}
                </a>
              </div>

              <div className="user-detail-item">
                <span className="user-detail-icon">🌐</span>
                <span className="user-detail-label">Website:</span>
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="user-detail-value user-website"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;

