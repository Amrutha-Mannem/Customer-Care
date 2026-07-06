// client/src/components/Profile.jsx
const Profile = ({ user }) => {
  // Mock stats for visual appeal
  const stats = [
    { label: 'Total Complaints', value: '', icon: '📋' },
    { label: 'Resolved', value: '1', icon: '✅' },
    { label: 'Pending', value: '2', icon: '⏳' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👤 My Profile</h1>
      
      {/* Profile Header Card */}
      <div style={styles.profileHeader}>
        <div style={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{user.name}</h2>
          <span style={styles.roleBadge}>{user.role.toUpperCase()}</span>
          <p style={styles.profileEmail}>{user.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Details Card */}
      <div style={styles.detailsCard}>
        <h3 style={styles.sectionTitle}>Account Details</h3>
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Full Name</span>
            <span style={styles.detailValue}>{user.name}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Email Address</span>
            <span style={styles.detailValue}>{user.email}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Phone Number</span>
            <span style={styles.detailValue}>{user.phone || 'Not provided'}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Account Role</span>
            <span style={styles.detailValue}>{user.role}</span>
          </div>
        </div>
        <button style={styles.editButton}>✏️ Edit Profile</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '900px', margin: '0 auto' },
  title: { marginBottom: '30px', color: '#1e3a8a', fontSize: '36px', fontWeight: '800', textAlign: 'center' },
  profileHeader: { background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', padding: '40px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '30px', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)', marginBottom: '30px' },
  avatar: { width: '100px', height: '100px', borderRadius: '50%', background: 'white', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  profileInfo: { color: 'white' },
  profileName: { margin: '0 0 10px 0', fontSize: '32px', fontWeight: '700' },
  roleBadge: { background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px' },
  profileEmail: { margin: '15px 0 0 0', fontSize: '16px', opacity: '0.9' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(30, 58, 138, 0.1)', border: '2px solid #e2e8f0', borderTop: '4px solid #3b82f6' },
  statIcon: { fontSize: '30px', marginBottom: '10px' },
  statValue: { fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '5px' },
  statLabel: { color: '#64748b', fontSize: '14px', fontWeight: '600' },
  detailsCard: { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1)', border: '2px solid #e2e8f0' },
  sectionTitle: { color: '#1e3a8a', fontSize: '24px', fontWeight: '700', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' },
  detailItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
  detailLabel: { fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  detailValue: { fontSize: '18px', color: '#0f172a', fontWeight: '500', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
  editButton: { padding: '14px 30px', background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }
};

export default Profile;