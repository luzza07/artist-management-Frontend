'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboard, logout } from '@/api/api';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Dashboard component mounted");
    
    // Check for browser environment
    if (typeof window === 'undefined') {
      console.log("Running on server side, skipping auth check");
      return;
    }
    
    // Client-side code
    const token = localStorage.getItem('access_token');
    const storedRole = localStorage.getItem('user_role');
    
    console.log("Token exists:", !!token);
    console.log("Role exists:", !!storedRole, "Value:", storedRole);

    if (!token || !storedRole) {
      console.log("Missing credentials, redirecting to login");
      router.push('/');
      return;
    }

    // Set initial role from localStorage
    setRole(storedRole);
    
    // Use the imported API function
    getDashboard(token)
      .then(data => {
        console.log("Dashboard data fetched:", data);
        setDashboardData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching dashboard:", error);
        // If unauthorized, clear data and redirect to login
        if (error.status === 401 || error.response?.status === 401) {
          console.log("Unauthorized. Logging out.");
          logout();
          router.push('/');
        }
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <h2 className="text-xl mt-2">Your role: {role}</h2>

      <div className="mt-6">
        {role === 'super_admin' && dashboardData && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Super Admin Dashboard</h3>
            <p>Total Users: {dashboardData.total_users}</p>
            <p>Total Approved Artists: {dashboardData.total_approved_artists}</p>
          </div>
        )}

        {role === 'artist_manager' && dashboardData && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Artist Manager Dashboard</h3>
            <p>Total Artists: {dashboardData.total_artists}</p>
            <p>Pending Approvals: {dashboardData.pending_approvals}</p>
          </div>
        )}

        {role === 'artist' && dashboardData && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Artist Dashboard</h3>
            <p>Total Works: {dashboardData.total_works}</p>
            <p>Recent Works: {dashboardData.recent_works?.join(', ') || 'No recent works'}</p>
          </div>
        )}
      </div>
    </div>
  );
}