import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerOverview from './components/CustomerOverview';
import RaiseComplaint from './components/RaiseComplaint';
import MyComplaints from './components/MyComplaints';
import FeedbackForm from './components/FeedbackForm';
import Profile from './components/Profile';
// Placeholder components for future pages

const AgentDashboard = () => <div style={{padding: '30px'}}><h1>📊 Agent Dashboard</h1><p>Coming soon!</p></div>;
const AssignedComplaints = () => <div style={{padding: '30px'}}><h1>📥 Assigned Complaints</h1><p>Coming soon!</p></div>;
const AdminDashboard = () => <div style={{padding: '30px'}}><h1>📈 Admin Dashboard</h1><p>Coming soon!</p></div>;
const ManageUsers = () => <div style={{padding: '30px'}}><h1>👥 Manage Users</h1><p>Coming soon!</p></div>;
const AllComplaints = () => <div style={{padding: '30px'}}><h1>📋 All Complaints</h1><p>Coming soon!</p></div>;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px', color: '#667eea'}}>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Dashboard Component
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <nav style={styles.sidebar}>
        <div style={styles.logo}>SmartBridge</div>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user.name}</div>
          <div style={styles.userRole}>{user.role}</div>
        </div>
        <ul style={styles.navMenu}>
          {user.role === 'customer' && (
            <>
              <li onClick={() => setActiveTab('overview')} style={styles.navItem}>📊 Dashboard</li>
              <li onClick={() => setActiveTab('raiseComplaint')} style={styles.navItem}>📝 Raise Complaint</li>
              <li onClick={() => setActiveTab('myComplaints')} style={styles.navItem}>📋 My Complaints</li>
              <li onClick={() => setActiveTab('feedback')} style={styles.navItem}>⭐ Feedback</li>
            </>
          )}
          {user.role === 'agent' && (
            <>
              <li onClick={() => setActiveTab('agentDashboard')} style={styles.navItem}>📊 My Dashboard</li>
              <li onClick={() => setActiveTab('assignedComplaints')} style={styles.navItem}>📥 Assigned Complaints</li>
            </>
          )}
          {user.role === 'admin' && (
            <>
              <li onClick={() => setActiveTab('adminDashboard')} style={styles.navItem}>📈 Admin Panel</li>
              <li onClick={() => setActiveTab('manageUsers')} style={styles.navItem}>👥 Manage Users</li>
              <li onClick={() => setActiveTab('allComplaints')} style={styles.navItem}>📋 All Complaints</li>
            </>
          )}
          <li onClick={() => setActiveTab('profile')} style={styles.navItem}>👤 Profile</li>
          <li onClick={logout} style={{...styles.navItem, ...styles.logout}}>🚪 Logout</li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {activeTab === 'overview' && <CustomerOverview user={user} />}
        {activeTab === 'raiseComplaint' && <RaiseComplaint setActiveTab={setActiveTab} />}
        {activeTab === 'myComplaints' && <MyComplaints />}
        {activeTab === 'feedback' && <FeedbackForm />}
        {activeTab === 'profile' && <Profile user={user} />}
        {activeTab === 'agentDashboard' && <AgentDashboard />}
        {activeTab === 'assignedComplaints' && <AssignedComplaints />}
        {activeTab === 'adminDashboard' && <AdminDashboard />}
        {activeTab === 'manageUsers' && <ManageUsers />}
        {activeTab === 'allComplaints' && <AllComplaints />}
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Styles
const styles = {
  dashboardContainer: { display: 'flex', minHeight: '100vh', background: '#f0f4f8' },
  sidebar: { width: '260px', background: 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 50%, #7c3aed 100%)', color: 'white', padding: '20px', boxShadow: '4px 0 15px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '28px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', letterSpacing: '1.5px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', color: '#ffffff' },
  userInfo: { marginBottom: '30px', padding: '20px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' },
  userName: { fontWeight: '700', marginBottom: '5px', fontSize: '16px', color: '#ffffff' },
  userRole: { fontSize: '13px', opacity: 0.9, textTransform: 'capitalize', color: '#e0e7ff' },
  navMenu: { listStyle: 'none', padding: 0, margin: 0, flex: 1 },
  navItem: { padding: '14px 18px', marginBottom: '10px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '15px', fontWeight: '500', color: '#ffffff', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' },
  logout: { background: 'rgba(239, 68, 68, 0.8)', marginTop: 'auto', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)', fontWeight: '600' },
  mainContent: { flex: 1, padding: '30px', overflowY: 'auto', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }
};

export default App;