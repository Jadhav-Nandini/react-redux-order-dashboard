import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Product from './components/Product'
import Navbar from './components/Navbarr'
import CustomerDetail from './components/CustomerDetail'
import { useSelector } from "react-redux";
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'

function App() {

  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>


          <Route
          path="/"
          element={
            currentUser ? <Navigate to="/dashboard" /> : <Register />
          }
        />

          <Route
            path="/login"
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
          />


            <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

        {/* CUSTOMER DETAIL */}
        <Route
          path="/customer-detail"
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />

         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
