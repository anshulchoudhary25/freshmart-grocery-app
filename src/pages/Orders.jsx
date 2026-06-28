import React from 'react';
import { Link } from 'react-router-dom';

const pastOrders = [
  {
    id: 'ORD-8821', date: '20 Apr 2026', time: '10:32 AM',
    items: [
      { name: 'Fresh Red Apples', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&q=80', price: 89 },
      { name: 'Whole Milk 1L', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&q=80', price: 68 },
    ],
    total: 157, status: 'Delivered', statusColor: '#16a34a', statusBg: '#f0fdf4',
  },
  {
    id: 'ORD-7743', date: '17 Apr 2026', time: '2:15 PM',
    items: [
      { name: 'Basmati Rice 5kg', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&q=80', price: 349 },
      { name: 'Organic Butter', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=80&q=80', price: 245 },
    ],
    total: 594, status: 'Delivered', statusColor: '#16a34a', statusBg: '#f0fdf4',
  },
];

export default function Orders() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>
          📦 My Orders
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pastOrders.map(order => (
            <div key={order.id} style={{
              background: '#fff', borderRadius: 16, padding: 24,
              border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Order #{order.id}</p>
                  <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>
                    {order.date} at {order.time}
                  </p>
                </div>
                <span style={{
                  background: order.statusBg, color: order.statusColor,
                  padding: '5px 14px', borderRadius: 20,
                  fontSize: 13, fontWeight: 700,
                }}>
                  ✓ {order.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                {order.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', borderRadius: 10, padding: '8px 12px' }}>
                    <img src={item.img} alt={item.name}
                      style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
                      onError={e => e.target.style.display = 'none'}
                    />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{item.name}</p>
                      <p style={{ fontSize: 11, color: '#94a3b8' }}>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>₹{order.total}</span>
                <button style={{
                  background: 'linear-gradient(135deg, #0f4c81, #1a7a4a)',
                  color: '#fff', border: 'none', padding: '9px 22px',
                  borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                }}>
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link to="/" style={{
            color: '#0f4c81', fontWeight: 700, fontSize: 15,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}