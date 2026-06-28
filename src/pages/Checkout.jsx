import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { sanitizeInput, validateCheckoutForm, generateCSRFToken } from '../utils/security';

export default function Checkout() {
  const { items, total } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', pincode: '', payment: 'cod',
  });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const sanitized = {
      ...form,
      name: sanitizeInput(form.name),
      address: sanitizeInput(form.address),
    };
    const errs = validateCheckoutForm(sanitized);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const csrfToken = generateCSRFToken();
    console.log('Order placed securely:', { ...sanitized, csrfToken, items, total });
    setOrdered(true);
    dispatch(clearCart());
  };

  if (items.length === 0 && !ordered) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', background: '#f1f3f6', minHeight: '100vh' }}>
        <p style={{ fontSize: '56px' }}>🛒</p>
        <h2 style={{ marginTop: '16px' }}>Your cart is empty!</h2>
        <button onClick={() => navigate('/')} style={{
          marginTop: '20px', background: '#2874f0', color: '#fff',
          border: 'none', padding: '12px 32px', borderRadius: '4px',
          fontWeight: 700, fontSize: '15px', cursor: 'pointer',
        }}>
          Shop Now
        </button>
      </div>
    );
  }

  if (ordered) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', background: '#f1f3f6', minHeight: '100vh' }}>
        <p style={{ fontSize: '72px' }}>🎉</p>
        <h2 style={{ fontSize: '26px', color: '#388e3c', marginTop: '16px', fontWeight: 800 }}>
          Order Placed Successfully!
        </h2>
        <p style={{ color: '#555', marginTop: '8px', fontSize: '15px' }}>
          Your groceries will be delivered in 30 minutes
        </p>
        <div style={{
          background: '#fff', borderRadius: '8px', padding: '20px',
          maxWidth: '360px', margin: '24px auto', border: '1px solid #e0e0e0',
        }}>
          <p style={{ fontSize: '14px', color: '#888' }}>Order ID</p>
          <p style={{ fontWeight: 800, fontSize: '18px', color: '#2874f0', marginTop: '4px' }}>
            #{Math.floor(Math.random() * 900000 + 100000)}
          </p>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '12px' }}>Amount Paid</p>
          <p style={{ fontWeight: 800, fontSize: '22px', color: '#212121', marginTop: '4px' }}>
            ₹{total || 0}
          </p>
        </div>
        <button onClick={() => navigate('/')} style={{
          background: '#2874f0', color: '#fff', border: 'none',
          padding: '12px 32px', borderRadius: '4px', fontWeight: 700,
          fontSize: '15px', cursor: 'pointer',
        }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px', borderRadius: '4px', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
    border: errors[field] ? '1.5px solid #ff6161' : '1.5px solid #e0e0e0',
    marginTop: '6px',
  });

  const labelStyle = {
    fontSize: '13px', fontWeight: 600, color: '#555',
  };

  const errorStyle = {
    color: '#ff6161', fontSize: '12px', marginTop: '4px',
  };

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Checkout</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'start' }}>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#212121' }}>
              📦 Delivery Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Anshul Kumar" style={inputStyle('name')} />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile number" style={inputStyle('phone')} />
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Email Address</label>
                <input name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" style={inputStyle('email')} />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Delivery Address</label>
                <textarea name="address" value={form.address} onChange={handleChange}
                  placeholder="House no., Street, Area, City..."
                  rows={3}
                  style={{ ...inputStyle('address'), resize: 'vertical', fontFamily: 'inherit' }} />
                {errors.address && <p style={errorStyle}>{errors.address}</p>}
              </div>
              <div>
                <label style={labelStyle}>Pincode</label>
                <input name="pincode" value={form.pincode} onChange={handleChange}
                  placeholder="6-digit pincode" style={inputStyle('pincode')} />
                {errors.pincode && <p style={errorStyle}>{errors.pincode}</p>}
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#212121' }}>
              💳 Payment Method
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { value: 'cod',  label: '💵 Cash on Delivery' },
                { value: 'upi',  label: '📱 UPI (GPay, PhonePe, Paytm)' },
                { value: 'card', label: '💳 Credit / Debit Card' },
              ].map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '6px', cursor: 'pointer',
                  border: form.payment === opt.value ? '1.5px solid #2874f0' : '1.5px solid #e0e0e0',
                  background: form.payment === opt.value ? '#f0f5ff' : '#fff',
                }}>
                  <input type="radio" name="payment" value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={handleChange}
                    style={{ accentColor: '#2874f0' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '15px', background: '#fb641b',
            color: '#fff', border: 'none', borderRadius: '4px',
            fontWeight: 800, fontSize: '17px', cursor: 'pointer',
          }}>
            Place Order Securely 🔒
          </button>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
            🔒 Protected by XSS sanitization and CSRF token security
          </p>
        </form>

        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ fontSize: '15px', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px' }}>
            Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>{item.img}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#212121' }}>{item.name}</p>
                  <p style={{ fontSize: '12px', color: '#888' }}>Qty: {item.qty}</p>
                </div>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px dashed #e0e0e0', marginTop: '16px', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span style={{ color: '#555' }}>Subtotal</span><span>₹{total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#388e3c' }}>
              <span>Delivery</span><span>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '18px', marginTop: '12px', borderTop: '1px solid #e0e0e0', paddingTop: '12px' }}>
              <span>Total</span><span style={{ color: '#2874f0' }}>₹{total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}