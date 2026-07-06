// client/src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Send data to backend
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post('http://localhost:8000/api/auth/register', dataToSend);
      
      // Save to local storage
      const { token, ...userData } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Join <span style={{color: '#667eea'}}>SmartBridge</span></h2>
        <h3 style={styles.subtitle}>Create your account</h3>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} placeholder="John Doe" />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} placeholder="john@example.com" />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={styles.input} placeholder="+1 234 567 8900" />
          </div>

          <div style={styles.row}>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.input} placeholder="••••••••" />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Confirm</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} placeholder="••••••••" />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>I am a:</label>
            <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
              <option value="customer">Customer</option>
              <option value="agent">Support Agent</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
        <p style={{...styles.text, marginTop: '10px'}}>
          <Link to="/" style={{color: '#888', fontSize: '14px'}}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' },
  card: { background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '100%', maxWidth: '500px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '5px', fontSize: '28px' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '16px', fontWeight: 'normal' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  row: { display: 'flex', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontWeight: '600', color: '#555', fontSize: '14px' },
  input: { padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', outline: 'none', transition: 'border 0.3s' },
  button: { padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)' },
  error: { background: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', textAlign: 'center' },
  text: { textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' },
  link: { color: '#667eea', textDecoration: 'none', fontWeight: '600' }
};

export default Register;