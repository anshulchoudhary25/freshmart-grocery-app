import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains', 'Beverages'];

const categoryIcons = {
  All: '🛍️', Fruits: '🍎', Vegetables: '🥦', Dairy: '🥛', Grains: '🌾', Beverages: '🧃',
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q') || '';

  const filtered = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f4c81 0%, #1a7a4a 100%)',
        padding: '48px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 120, width: 160, height: 160, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 20, right: 200, width: 80, height: 80, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.15)',
            padding: '4px 14px', borderRadius: 20, marginBottom: 14,
          }}>
            <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700 }}>
              ⚡ Express Delivery in 30 mins
            </span>
          </div>
          <h1 style={{
            color: '#fff', fontSize: 38, fontWeight: 900,
            lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.5px',
          }}>
            Fresh Groceries,<br />
            <span style={{ color: '#86efac' }}>Delivered Fast 🚀</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 24 }}>
            Farm-fresh produce at your doorstep every day
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['🌱 100% Fresh', '🚚 Free Delivery', '💯 Best Prices'].map(tag => (
              <div key={tag} style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                padding: '8px 18px', borderRadius: 30, color: '#fff',
                fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)',
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '10px 22px', borderRadius: 50,
              border: activeCategory === cat ? 'none' : '1.5px solid #e2e8f0',
              background: activeCategory === cat
                ? 'linear-gradient(135deg, #0f4c81, #1a7a4a)'
                : '#fff',
              color: activeCategory === cat ? '#fff' : '#475569',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              boxShadow: activeCategory === cat ? '0 4px 12px rgba(15,76,129,0.3)' : 'none',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{categoryIcons[cat]}</span> {cat}
            </button>
          ))}
        </div>

        {/* Results info */}
        {query && (
          <p style={{ color: '#64748b', marginBottom: 20, fontSize: 14 }}>
            Showing <strong>{filtered.length}</strong> results for "<strong>{query}</strong>"
          </p>
        )}

        {/* Section Title */}
        {!query && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px' }}>
              {activeCategory === 'All' ? '🛒 All Products' : `${categoryIcons[activeCategory]} ${activeCategory}`}
            </h2>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>
              {filtered.length} items
            </span>
          </div>
        )}

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 20, color: '#0f172a', fontWeight: 700 }}>No products found</h3>
            <p style={{ color: '#94a3b8', marginTop: 8 }}>Try a different search or category</p>
          </div>
        )}

      </div>
    </div>
  );
}