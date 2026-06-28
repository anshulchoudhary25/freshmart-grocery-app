import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0));
  const cartTotal = useSelector(s => s.cart.total);
  const { isLoggedIn, user } = useSelector(s => s.auth);

  const handleSearch = () => {
    if (search.trim()) navigate(`/?q=${search}`);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #0f4c81 0%, #0d3d68 100%)',
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 20px rgba(15,76,129,0.4)',
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
        <div style={{
          background: 'linear-gradient(135deg, #4ade80, #22c55e)',
          borderRadius: 10, width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 2px 8px rgba(74,222,128,0.4)',
        }}>
          🛒
        </div>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px' }}>
          Fresh<span style={{ color: '#4ade80' }}>Mart</span>
        </span>
      </Link>

      {/* Search Bar */}
      <div style={{
        flex: 1, maxWidth: 520,
        display: 'flex',
        boxShadow: searchFocused ? '0 0 0 3px rgba(74,222,128,0.4)' : 'none',
        borderRadius: 10, overflow: 'hidden',
        transition: 'box-shadow 0.2s',
      }}>
        <input
          type="text"
          placeholder="🔍  Search for groceries, fruits, dairy..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            flex: 1, padding: '11px 18px', border: 'none',
            fontSize: 14, outline: 'none', background: '#fff',
            color: '#0f172a',
          }}
        />
        <button onClick={handleSearch} style={{
          padding: '11px 22px',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          border: 'none', fontWeight: 800, fontSize: 14,
          cursor: 'pointer', color: '#fff', letterSpacing: '0.3px',
        }}>
          Search
        </button>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginLeft: 'auto' }}>

        {isLoggedIn ? (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.1)', padding: '6px 14px',
              borderRadius: 30, border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: '#fff',
              }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>
                {user?.name}
              </span>
            </div>

            <Link to="/orders" style={{
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 600, padding: '6px 12px',
              borderRadius: 8, transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              📦 Orders
            </Link>

            <button onClick={() => dispatch(logout())} style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', padding: '7px 16px', borderRadius: 8,
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,100,100,0.3)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            color: '#fff', padding: '8px 20px',
            borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(74,222,128,0.4)',
          }}>
            Login
          </Link>
        )}

        {/* Cart */}
        <Link to="/cart" style={{
          textDecoration: 'none', position: 'relative',
          background: cartCount > 0 ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.1)',
          border: cartCount > 0 ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.15)',
          padding: '8px 18px', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.2s',
        }}>
          <span style={{ fontSize: 18 }}>🛒</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>
              Cart {cartCount > 0 && `(${cartCount})`}
            </div>
            {cartTotal > 0 && (
              <div style={{ color: '#fbbf24', fontSize: 11, fontWeight: 700 }}>₹{cartTotal}</div>
            )}
          </div>
          {cartCount > 0 && (
            <div style={{
              position: 'absolute', top: -6, right: -6,
              background: '#ef4444', color: '#fff',
              fontSize: 10, fontWeight: 800,
              width: 18, height: 18, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {cartCount}
            </div>
          )}
        </Link>

      </div>
    </nav>
  );
}