'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboard } from '@/api/api'; // Use your existing API function

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
        setLoading(false);
      });
  }, []); // Remove router dependency

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <h2 className="text-xl mt-2">Your role: {role}</h2>

      <div className="mt-6">
        {role === 'super_admin' && dashboardData && (
          <div>
            <h3 className="text-lg font-semibold">Super Admin Dashboard</h3>
            <p>Total Users: {dashboardData.total_users}</p>
            <p>Total Approved Artists: {dashboardData.total_approved_artists}</p>
          </div>
        )}

        {role === 'artist_manager' && dashboardData && (
          <div>
            <h3 className="text-lg font-semibold">Artist Manager Dashboard</h3>
            <p>Total Artists: {dashboardData.total_artists}</p>
            <p>Pending Approvals: {dashboardData.pending_approvals}</p>
          </div>
        )}

        {role === 'artist' && dashboardData && (
          <div>
            <h3 className="text-lg font-semibold">Artist Dashboard</h3>
            <p>Total Works: {dashboardData.total_works}</p>
            <p>Recent Works: {dashboardData.recent_works?.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
   
  );
}