import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerOverview = ({ user }) => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    inProgressComplaints: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    fetchComplaintStats();
  }, []);

  const fetchComplaintStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const complaints = response.data.data || [];
      console.log('Fetched complaints:', complaints); // Debug log
      
      // Calculate accurate stats
      const total = complaints.length;
      const pending = complaints.filter(c => 
        c.status && c.status.toLowerCase() === 'pending'
      ).length;
      const resolved = complaints.filter(c => 
        c.status && c.status.toLowerCase() === 'resolved'
      ).length;
      const inProgress = complaints.filter(c => 
        c.status && c.status.toLowerCase() === 'in progress'
      ).length;

      setStats({
        totalComplaints: total,
        pendingComplaints: pending,
        resolvedComplaints: resolved,
        inProgressComplaints: inProgress
      });

      // Get recent complaints (last 5)
      setRecentComplaints(complaints.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values on error
      setStats({
        totalComplaints: 0,
        pendingComplaints: 0,
        resolvedComplaints: 0,
        inProgressComplaints: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={styles.overview}>
      <h1 style={styles.welcome}>Welcome back, {user.name}! 👋</h1>
      <p style={styles.subtitle}>Here's an overview of your account</p>
      
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📋</div>
          <div style={styles.statValue}>{stats.totalComplaints}</div>
          <div style={styles.statLabel}>Total Complaints</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statValue}>{stats.pendingComplaints}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🔄</div>
          <div style={styles.statValue}>{stats.inProgressComplaints}</div>
          <div style={styles.statLabel}>In Progress</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statValue}>{stats.resolvedComplaints}</div>
          <div style={styles.statLabel}>Resolved</div>
        </div>
      </div>

      {/* Recent Complaints Section */}
      {recentComplaints.length > 0 && (
        <div style={styles.recentSection}>
          <h2 style={styles.sectionTitle}>Recent Complaints</h2>
          <div style={styles.recentList}>
            {recentComplaints.map((complaint) => (
              <div key={complaint._id} style={styles.recentCard}>
                <div style={styles.recentHeader}>
                  <h3 style={styles.recentTitle}>{complaint.title}</h3>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatusColor(complaint.status)
                  }}>
                    {complaint.status}
                  </span>
                </div>
                <p style={styles.recentDesc}>{complaint.description}</p>
                <div style={styles.recentMeta}>
                  <span>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  <span>🏷️ {complaint.category}</span>
                  <span>⚡ {complaint.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionButtons}>
          <button style={styles.actionButton}>📝 Raise New Complaint</button>
          <button style={styles.actionButton}>📋 View All Complaints</button>
          <button style={styles.actionButton}>💬 Contact Support</button>
        </div>
      </div>
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  const colors = {
    'Pending': '#ffc107',
    'Assigned': '#17a2b8',
    'In Progress': '#007bff',
    'Resolved': '#28a745',
    'Closed': '#6c757d'
  };
  return colors[status] || '#6c757d';
};

const styles = {
  overview: { padding: '40px', position: 'relative' },
  welcome: { fontSize: '36px', marginBottom: '15px', color: '#1e3a8a', fontWeight: '800', textShadow: '0 4px 8px rgba(30, 58, 138, 0.2)', letterSpacing: '-0.5px' },
  subtitle: { color: '#64748b', marginBottom: '40px', fontSize: '17px', fontWeight: '500' },
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' },
  loadingText: { fontSize: '20px', color: '#64748b', fontWeight: '600' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', marginBottom: '40px' },
  statCard: { background: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(30, 58, 138, 0.1), 0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center', border: '2px solid #e2e8f0', borderTop: '4px solid #3b82f6', transition: 'transform 0.3s ease' },
  statIcon: { fontSize: '40px', marginBottom: '15px' },
  statValue: { fontSize: '42px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' },
  statLabel: { color: '#64748b', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  recentSection: { marginBottom: '40px' },
  sectionTitle: { fontSize: '24px', color: '#1e3a8a', fontWeight: '700', marginBottom: '20px' },
  recentList: { display: 'grid', gap: '15px' },
  recentCard: { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(30, 58, 138, 0.08)', border: '2px solid #e2e8f0', borderLeft: '4px solid #3b82f6' },
  recentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  recentTitle: { margin: 0, color: '#1e3a8a', fontSize: '18px', fontWeight: '600' },
  statusBadge: { padding: '6px 15px', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' },
  recentDesc: { color: '#475569', marginBottom: '12px', lineHeight: '1.5', fontSize: '14px' },
  recentMeta: { display: 'flex', gap: '20px', color: '#64748b', fontSize: '13px', fontWeight: '500' },
  quickActions: { background: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 8px 30px rgba(30, 58, 138, 0.1), 0 4px 12px rgba(0,0,0,0.05)', border: '2px solid #e2e8f0' },
  actionButtons: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  actionButton: { padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'transform 0.2s' }
};

export default CustomerOverview;