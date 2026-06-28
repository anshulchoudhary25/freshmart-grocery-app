import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { sanitizeInput, generateCSRFToken } from '../utils/security';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUsers = useSelector(s => s.auth.registeredUsers);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim())
      errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    if (!form.password)
      errs.password = 'Password is required';
    else if (form.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Step 1 — basic validation
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Step 2 — check if user exists
    const foundUser = registeredUsers.find(
      u => u.email === form.email.toLowerCase()
    );

    if (!foundUser) {
      setErrors({ email: 'No account found with this email. Please register first!' });
      return;
    }

    // Step 3 — check password
    if (foundUser.password !== form.password) {
      setErrors({ password: 'Incorrect password. Please try again!' });
      return;
    }

    // Step 4 — login success
    setLoading(true);
    const csrfToken = generateCSRFToken();
    const sanitizedEmail = sanitizeInput(form.email);

    setTimeout(() => {
      dispatch(login({
        name: foundUser.name,
        email: sanitizedEmail,
        csrfToken,
      }));
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const inputStyle = field => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    border: errors[field] ? '1.5px solid #ff6161' : '1.5px solid #e0e0e0',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
    marginTop: '5px',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f3f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        display: 'flex',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        width: '100%',
        maxWidth: '750px',
      }}>

        {/* Left Blue Panel */}
        <div style={{
          background: 'linear-gradient(160deg, #2874f0, #1a56c4)',
          padding: '48px 36px',
          width: '40%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
            🛒 FreshMart
          </div>
          <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: '1.5', marginBottom: '16px' }}>
            Login & get access to your orders and cart
          </p>
          <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: '1.6' }}>
            Fresh groceries delivered to your door in 30 minutes
          </p>
          <div style={{ marginTop: '32px', fontSize: '13px', opacity: 0.75 }}>
            <div style={{ marginBottom: '8px' }}>✓ Secure login with CSRF protection</div>
            <div style={{ marginBottom: '8px' }}>✓ XSS-safe input handling</div>
            <div>✓ Encrypted data transmission</div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div style={{ background: '#fff', padding: '48px 36px', flex: 1 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#212121', marginBottom: '6px' }}>
            Welcome back!
          </h2>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px' }}>
            Enter your registered email and password
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Email */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>
                Email Address
              </label>
              <input
                name="email"
                type="text"
                value={form.email}
                onChange={handleChange}
                placeholder="your-registered@email.com"
                style={inputStyle('email')}
                onFocus={e => e.target.style.borderColor = '#2874f0'}
                onBlur={e => e.target.style.borderColor = errors.email ? '#ff6161' : '#e0e0e0'}
              />
              {errors.email && (
                <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '5px' }}>
                  ⚠ {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  style={{ ...inputStyle('password'), paddingRight: '44px' }}
                  onFocus={e => e.target.style.borderColor = '#2874f0'}
                  onBlur={e => e.target.style.borderColor = errors.password ? '#ff6161' : '#e0e0e0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', fontSize: '16px',
                  }}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '5px' }}>
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? '#aaa' : '#fb641b',
                color: '#fff', border: 'none', borderRadius: '6px',
                fontWeight: 800, fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {loading ? '⏳ Logging in...' : 'Login →'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
              <span style={{ fontSize: '12px', color: '#aaa' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
            </div>

            {/* Register Link Box */}
            <div style={{
              textAlign: 'center', padding: '14px',
              border: '1.5px solid #2874f0', borderRadius: '6px',
            }}>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                New to FreshMart?
              </p>
              <Link to="/register" style={{
                color: '#2874f0', fontWeight: 700,
                fontSize: '15px', textDecoration: 'none',
              }}>
                Create Account →
              </Link>
            </div>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#bbb' }}>
              🔒 Protected by XSS sanitization & CSRF token
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}