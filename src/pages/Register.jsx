import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { sanitizeInput } from '../utils/security';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registeredUsers = useSelector(s => s.auth.registeredUsers);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: '#eee', width: '0%' };
    if (pass.length < 6) return { label: 'Weak', color: '#ff6161', width: '25%' };
    if (pass.length < 8) return { label: 'Fair', color: '#f5a623', width: '50%' };
    if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) return { label: 'Good', color: '#2874f0', width: '75%' };
    return { label: 'Strong 💪', color: '#388e3c', width: '100%' };
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Full name is required';
    else if (form.name.trim().length < 3)
      errs.name = 'Name must be at least 3 characters';
    if (!form.email.trim())
      errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    else if (registeredUsers.find(u => u.email === form.email.toLowerCase()))
      errs.email = 'This email is already registered! Please login.';
    if (!form.phone.trim())
      errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone))
      errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.password)
      errs.password = 'Password is required';
    else if (form.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)
      errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);

    const newUser = {
      name: sanitizeInput(form.name),
      email: form.email.toLowerCase(),
      phone: form.phone,
      password: form.password, // in real app this would be hashed
    };

    setTimeout(() => {
      dispatch(registerUser(newUser));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 1200);
  };

  const strength = getPasswordStrength(form.password);

  const inputStyle = field => ({
    width: '100%', padding: '11px 14px', borderRadius: '6px',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    border: errors[field] ? '1.5px solid #ff6161' : '1.5px solid #e0e0e0',
    fontFamily: 'inherit', marginTop: '5px',
  });

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '64px' }}>🎉</div>
        <h2 style={{ color: '#388e3c', fontSize: '22px', marginTop: '16px', fontWeight: 800 }}>
          Account Created Successfully!
        </h2>
        <p style={{ color: '#888', marginTop: '8px' }}>Redirecting you to login...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '32px' }}>🛒</div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#212121', marginTop: '8px' }}>Create Account</h2>
          <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Join FreshMart for fresh groceries</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="Your full name" style={inputStyle('name')} />
            {errors.name && <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '4px' }}>⚠ {errors.name}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Email Address</label>
            <input name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" style={inputStyle('email')} />
            {errors.email && <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '4px' }}>⚠ {errors.email}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="10-digit mobile number" style={inputStyle('phone')} />
            {errors.phone && <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '4px' }}>⚠ {errors.phone}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input name="password" type={showPassword ? 'text' : 'password'}
                value={form.password} onChange={handleChange}
                placeholder="Minimum 6 characters"
                style={{ ...inputStyle('password'), paddingRight: '44px' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ background: '#eee', borderRadius: '4px', height: '5px' }}>
                  <div style={{ background: strength.color, width: strength.width, height: '5px', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
                <p style={{ fontSize: '12px', color: strength.color, marginTop: '4px', fontWeight: 600 }}>
                  Password strength: {strength.label}
                </p>
              </div>
            )}
            {errors.password && <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '4px' }}>⚠ {errors.password}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>Confirm Password</label>
            <input name="confirmPassword" type="password"
              value={form.confirmPassword} onChange={handleChange}
              placeholder="Re-enter your password" style={inputStyle('confirmPassword')} />
            {errors.confirmPassword && <p style={{ color: '#ff6161', fontSize: '12px', marginTop: '4px' }}>⚠ {errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: loading ? '#aaa' : '#2874f0',
            color: '#fff', border: 'none', borderRadius: '6px',
            fontWeight: 800, fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '4px',
          }}>
            {loading ? '⏳ Creating Account...' : 'Create Account →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#888' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2874f0', fontWeight: 600 }}>Login</Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#bbb' }}>
            🔒 Your data is protected with XSS sanitization
          </p>

        </form>
      </div>
    </div>
  );
}