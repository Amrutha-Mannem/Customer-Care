import { useState, useEffect } from 'react';
import axios from 'axios';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <div style={{padding: '40px', textAlign: 'center', fontSize: '20px', color: '#64748b'}}>Loading complaints...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 My Complaints</h1>
      
      {complaints.length === 0 ? (
        <div style={styles.noComplaints}>
          <p>No complaints found. Raise your first complaint!</p>
        </div>
      ) : (
        <div style={styles.complaintsList}>
          {complaints.map((complaint) => (
            <div key={complaint._id} style={styles.complaintCard}>
              <div style={styles.complaintHeader}>
                <h3 style={styles.complaintTitle}>{complaint.title}</h3>
                <span style={{
                  ...styles.statusBadge,
                  background: getStatusColor(complaint.status)
                }}>
                  {complaint.status}
                </span>
              </div>
              <p style={styles.complaintDesc}>{complaint.description}</p>
              <div style={styles.complaintMeta}>
                <span>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                <span>🏷️ {complaint.category}</span>
                <span>⚡ {complaint.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '40px', position: 'relative' },
  title: { marginBottom: '35px', color: '#1e3a8a', fontSize: '36px', fontWeight: '800', textShadow: '0 4px 8px rgba(30, 58, 138, 0.2)', letterSpacing: '-0.5px' },
  noComplaints: { 
    textAlign: 'center', 
    padding: '60px', 
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
    borderRadius: '20px', 
    boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1), 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
    border: '2px solid rgba(226, 232, 240, 0.8)',
    fontSize: '18px',
    color: '#64748b',
    fontWeight: '600'
  },
  complaintsList: { display: 'grid', gap: '25px' },
  complaintCard: { 
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
    padding: '30px', 
    borderRadius: '16px', 
    boxShadow: '0 8px 32px rgba(30, 58, 138, 0.12), 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
    border: '2px solid rgba(226, 232, 240, 0.8)',
    borderLeft: '5px solid #3b82f6', // 3D left border effect
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  complaintHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' },
  complaintTitle: { margin: 0, color: '#1e3a8a', fontSize: '22px', fontWeight: '700', textShadow: '0 2px 4px rgba(30, 58, 138, 0.1)', letterSpacing: '-0.3px' },
  statusBadge: { 
    padding: '8px 20px', 
    borderRadius: '25px', 
    color: 'white', 
    fontSize: '13px', 
    fontWeight: '700', 
    textTransform: 'uppercase',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    letterSpacing: '0.5px',
    border: '2px solid rgba(255,255,255,0.2)'
  },
  complaintDesc: { color: '#475569', marginBottom: '18px', lineHeight: '1.7', fontSize: '15px' },
  complaintMeta: { display: 'flex', gap: '25px', color: '#64748b', fontSize: '14px', fontWeight: '600', textShadow: '0 1px 1px rgba(255,255,255,0.8)' }
};

export default MyComplaints;