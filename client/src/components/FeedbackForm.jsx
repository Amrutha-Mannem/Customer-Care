// client/src/components/FeedbackForm.jsx
import { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [category, setCategory] = useState('Service Quality');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setComments('');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⭐ Share Your Feedback</h1>
      <p style={styles.subtitle}>Your opinion helps us improve our service!</p>

      {submitted ? (
        <div style={styles.successMessage}>
          <h2>✅ Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>How would you rate your experience?</label>
            <div style={styles.starContainer}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} style={styles.starLabel}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={styles.hiddenRadio}
                    />
                    <span
                      style={{
                        ...styles.star,
                        color: ratingValue <= (hover || rating) ? '#ffc107' : '#e2e8f0',
                        transform: ratingValue <= (hover || rating) ? 'scale(1.2)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Feedback Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              style={styles.input}
            >
              <option>Service Quality</option>
              <option>Response Time</option>
              <option>Agent Behavior</option>
              <option>Resolution</option>
              <option>Overall Experience</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Your Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
              style={{...styles.input, minHeight: '120px', resize: 'vertical'}}
              placeholder="Tell us what you liked or what we can improve..."
            />
          </div>

          <button type="submit" style={styles.submitButton} disabled={rating === 0}>
            {rating === 0 ? 'Please select a rating' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '800px', margin: '0 auto' },
  title: { marginBottom: '10px', color: '#1e3a8a', fontSize: '36px', fontWeight: '800', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#64748b', marginBottom: '30px', fontSize: '16px' },
  form: { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1), 0 4px 12px rgba(0,0,0,0.05)', border: '2px solid #e2e8f0', borderTop: '5px solid #3b82f6' },
  formGroup: { marginBottom: '25px' },
  label: { display: 'block', marginBottom: '10px', fontWeight: '700', color: '#1e3a8a', fontSize: '16px' },
  input: { width: '100%', padding: '14px', border: '2px solid #cbd5e1', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box', background: '#f8fafc', color: '#0f172a' },
  starContainer: { display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0' },
  starLabel: { cursor: 'pointer' },
  hiddenRadio: { display: 'none' },
  star: { fontSize: '40px', transition: 'all 0.2s ease', display: 'inline-block' },
  submitButton: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)', marginTop: '10px', opacity: 1, transition: 'opacity 0.3s' },
  successMessage: { textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1)', border: '2px solid #e2e8f0' }
};

export default FeedbackForm;