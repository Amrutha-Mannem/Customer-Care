// client/src/pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { FaHeadset, FaChartLine, FaShieldAlt, FaClock, FaUsers, FaStar } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>SmartBridge</h1>
          <div style={styles.navButtons}>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.navButton}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')} 
              style={styles.navButtonPrimary}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>
            Welcome to <span style={styles.highlight}>SmartBridge</span> Customer Care
          </h2>
          <p style={styles.heroSubtitle}>
            Your trusted partner in delivering exceptional customer experiences. 
            We bridge the gap between you and outstanding service.
          </p>
          <div style={styles.heroButtons}>
            <button 
              onClick={() => navigate('/register')} 
              style={styles.heroButtonPrimary}
            >
              Start Your Journey
            </button>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.heroButtonSecondary}
            >
              Learn More
            </button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <FaHeadset style={styles.heroIcon} />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose SmartBridge?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <FaClock style={styles.featureIcon} />
            <h3>24/7 Support</h3>
            <p>Round-the-clock assistance whenever you need it</p>
          </div>
          <div style={styles.featureCard}>
            <FaChartLine style={styles.featureIcon} />
            <h3>Real-time Tracking</h3>
            <p>Monitor your complaints and inquiries in real-time</p>
          </div>
          <div style={styles.featureCard}>
            <FaShieldAlt style={styles.featureIcon} />
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with enterprise-grade security</p>
          </div>
          <div style={styles.featureCard}>
            <FaUsers style={styles.featureIcon} />
            <h3>Expert Agents</h3>
            <p>Professional team dedicated to resolving your issues</p>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section style={styles.about}>
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>About Our Customer Care Registry</h2>
          <p style={styles.aboutText}>
            SmartBridge Customer Care Registry is a centralized system designed to 
            revolutionize how businesses manage customer interactions. Our platform 
            enables efficient tracking of inquiries, complaints, and feedback while 
            providing data-driven insights to enhance service quality.
          </p>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>10K+</h3>
              <p style={styles.statLabel}>Happy Customers</p>
            </div>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>98%</h3>
              <p style={styles.statLabel}>Satisfaction Rate</p>
            </div>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>24/7</h3>
              <p style={styles.statLabel}>Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
        <div style={styles.testimonialGrid}>
          <div style={styles.testimonialCard}>
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <p>"Exceptional service! My issue was resolved within hours. Highly recommend!"</p>
            <h4>- Sarah Johnson</h4>
          </div>
          <div style={styles.testimonialCard}>
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <FaStar style={styles.starIcon} />
            <p>"The best customer care platform I've used. Quick, efficient, and professional."</p>
            <h4>- Michael Chen</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2>Ready to Experience SmartBridge?</h2>
        <p>Join thousands of satisfied customers today!</p>
        <button 
          onClick={() => navigate('/register')} 
          style={styles.ctaButton}
        >
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2026 SmartBridge Customer Care. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
          <a href="#" style={styles.footerLink}>Terms of Service</a>
          <a href="#" style={styles.footerLink}>Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f9fa'
  },
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px 50px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0
  },
  navButtons: {
    display: 'flex',
    gap: '15px'
  },
  navButton: {
    padding: '10px 25px',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s'
  },
  navButtonPrimary: {
    padding: '10px 25px',
    background: 'white',
    color: '#667eea',
    border: '2px solid white',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '100px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heroContent: {
    flex: 1,
    maxWidth: '600px'
  },
  heroTitle: {
    fontSize: '48px',
    color: 'white',
    marginBottom: '20px',
    lineHeight: '1.2'
  },
  highlight: {
    color: '#ffd700'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '40px',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '20px'
  },
  heroButtonPrimary: {
    padding: '15px 40px',
    background: '#ffd700',
    color: '#667eea',
    border: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  heroButtonSecondary: {
    padding: '15px 40px',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  heroIcon: {
    fontSize: '300px',
    color: 'rgba(255,255,255,0.2)'
  },
  features: {
    padding: '100px 50px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '36px',
    color: '#333',
    marginBottom: '60px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  featureCard: {
    background: 'white',
    padding: '40px 30px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s'
  },
  featureIcon: {
    fontSize: '60px',
    color: '#667eea',
    marginBottom: '20px'
  },
  about: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '100px 50px'
  },
  aboutContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  aboutText: {
    fontSize: '18px',
    color: 'white',
    lineHeight: '1.8',
    marginBottom: '50px',
    maxWidth: '800px',
    margin: '0 auto 50px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '800px',
    margin: '0 auto'
  },
  stat: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '48px',
    color: '#ffd700',
    marginBottom: '10px'
  },
  statLabel: {
    fontSize: '18px',
    color: 'white'
  },
  testimonials: {
    padding: '100px 50px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px'
  },
  testimonialCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  starIcon: {
    color: '#ffd700',
    fontSize: '20px',
    margin: '0 2px'
  },
  cta: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '80px 50px',
    textAlign: 'center'
  },
  ctaButton: {
    padding: '18px 50px',
    background: '#ffd700',
    color: '#667eea',
    border: 'none',
    borderRadius: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '30px',
    transition: 'all 0.3s'
  },
  footer: {
    background: '#2d3748',
    color: 'white',
    padding: '40px 50px',
    textAlign: 'center'
  },
  footerLinks: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px'
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default LandingPage;