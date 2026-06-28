import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem } from '../../redux/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector(s => s.cart.items.find(i => i.id === product.id));
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      position: 'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 2,
        background: '#16a34a', color: '#fff',
        fontSize: 11, fontWeight: 800, padding: '3px 10px',
        borderRadius: 20, letterSpacing: '0.3px',
      }}>
        {product.badge}
      </div>

      {/* Image Area */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          background: product.color || '#f8fafc',
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {!imgError ? (
          <img
            src={product.img}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ fontSize: 56, textAlign: 'center' }}>🛒</div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.category}
        </p>
        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 2, lineHeight: 1.3, cursor: 'pointer' }}
        >
          {product.name}
        </h3>
        <p style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 10 }}>{product.weight}</p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <div style={{
            background: '#16a34a', color: '#fff',
            fontSize: 11, fontWeight: 700,
            padding: '2px 8px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            ★ {product.rating}
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>({product.reviews?.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#0f172a' }}>₹{product.price}</span>
          <span style={{ fontSize: 13, color: '#cbd5e1', textDecoration: 'line-through' }}>₹{product.mrp}</span>
        </div>

        {/* Cart Button */}
        {!cartItem ? (
          <button
            onClick={() => dispatch(addItem(product))}
            style={{
              width: '100%', padding: '10px',
              background: 'linear-gradient(135deg, #0f4c81, #1a7a4a)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              transition: 'opacity 0.2s', letterSpacing: '0.2px',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.88'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            + Add to Cart
          </button>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0f4c81, #1a7a4a)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <button onClick={() => dispatch(removeItem(product.id))}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: '8px 16px', cursor: 'pointer', fontWeight: 700 }}>
              −
            </button>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{cartItem.qty}</span>
            <button onClick={() => dispatch(addItem(product))}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: '8px 16px', cursor: 'pointer', fontWeight: 700 }}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}