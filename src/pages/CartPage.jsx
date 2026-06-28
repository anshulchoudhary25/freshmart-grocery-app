import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, removeItem, deleteItem } from '../redux/cartSlice';

export default function CartPage() {
  const { items, total } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Your cart is empty</h2>
      <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Add fresh groceries to get started!</p>
      <Link to="/" style={{
        background: 'linear-gradient(135deg, #0f4c81, #1a7a4a)',
        color: '#fff', padding: '13px 32px', borderRadius: 12,
        textDecoration: 'none', fontWeight: 700, fontSize: 15,
        boxShadow: '0 4px 16px rgba(15,76,129,0.3)',
      }}>
        Shop Now →
      </Link>
    </div>
  );

  const savings = items.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>
          🛒 My Cart <span style={{ fontSize: 16, color: '#94a3b8', fontWeight: 500 }}>({items.length} items)</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{
                background: '#fff', borderRadius: 16, padding: 18,
                display: 'flex', alignItems: 'center', gap: 16,
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 12,
                  overflow: 'hidden', background: item.color || '#f8fafc',
                  flexShrink: 0,
                }}>
                  <img src={item.img} alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => e.target.style.display = 'none'}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{item.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{item.weight}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>₹{item.price}</span>
                    <span style={{ textDecoration: 'line-through', color: '#cbd5e1', fontSize: 12 }}>₹{item.mrp}</span>
                    <span style={{ color: '#16a34a', fontSize: 12, fontWeight: 700 }}>{item.badge}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => dispatch(removeItem(item.id))}
                    style={{ padding: '8px 14px', background: '#f8fafc', border: 'none', fontSize: 18, cursor: 'pointer', fontWeight: 700, color: '#0f172a' }}>−</button>
                  <span style={{ padding: '8px 14px', fontWeight: 800, borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', minWidth: 36, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => dispatch(addItem(item))}
                    style={{ padding: '8px 14px', background: '#f8fafc', border: 'none', fontSize: 18, cursor: 'pointer', fontWeight: 700, color: '#0f172a' }}>+</button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>₹{item.price * item.qty}</p>
                  <button onClick={() => dispatch(deleteItem(item.id))}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', marginTop: 6, fontWeight: 600 }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Savings Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              border: '1.5px solid #bbf7d0',
              borderRadius: 12, padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 24 }}>🎉</span>
              <p style={{ color: '#16a34a', fontWeight: 700, fontSize: 14 }}>
                You're saving <strong>₹{savings}</strong> on this order!
              </p>
            </div>
          </div>

          {/* Price Summary */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            position: 'sticky', top: 80,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 20 }}>
              Price Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Price ({items.length} items)</span>
                <span style={{ fontWeight: 600 }}>₹{items.reduce((s, i) => s + i.mrp * i.qty, 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Discount</span>
                <span style={{ fontWeight: 700 }}>− ₹{savings}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Delivery</span>
                <span style={{ fontWeight: 700 }}>FREE 🚚</span>
              </div>
              <div style={{
                borderTop: '2px dashed #f1f5f9', paddingTop: 14,
                display: 'flex', justifyContent: 'space-between',
                fontWeight: 900, fontSize: 20, color: '#0f172a',
              }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')} style={{
              width: '100%', marginTop: 24, padding: 15,
              background: 'linear-gradient(135deg, #0f4c81, #1a7a4a)',
              color: '#fff', border: 'none', borderRadius: 12,
              fontWeight: 800, fontSize: 16, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(15,76,129,0.3)',
              letterSpacing: '0.3px',
            }}>
              Proceed to Checkout →
            </button>

            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#94a3b8' }}>
              🔒 Safe & Secure Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}