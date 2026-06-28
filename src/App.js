import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { isLoggedIn } = useSelector(s => s.auth);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>

        {/* If already logged in, redirect / to home */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />

        {/* All these pages need login */}
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute><ProductDetail /></ProtectedRoute>
        } />

        {/* Any unknown URL → go to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;