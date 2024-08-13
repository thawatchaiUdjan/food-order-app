import './css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { LoadingProvider } from './components/contexts/LoadingContext.jsx'
import { ConfirmModalProvider } from './components/contexts/ConfirmModalContext'
import { AlertMessageProvider } from './components/contexts/AlertMessageContext.jsx'
import { FoodCartProvider } from './components/contexts/FoodCartContext.jsx'
import { AuthProvider } from './components/contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CheckedRoute from './components/CheckedRoute.jsx'
import Home from './components/screens/Home.jsx'
import About from './components/screens/About.jsx'
import Contract from './components/screens/Contract.jsx'
import FoodCart from './components/screens/FoodCart.jsx'
import Login from './components/screens/Login.jsx'
import NotFound from './components/screens/NotFound.jsx'
import Order from './components/screens/Order.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <CheckedRoute>
        <Login />
      </CheckedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/food_cart",
    element: (
      <ProtectedRoute>
        <FoodCart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute isCheckAdmin={true}>
        <Order />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // {
  //   path: "/about",
  //   element: <About />,
  // },
  // {
  //   path: "/contract",
  //   element: <Contract />,
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode data-theme='customTheme'>
    <AuthProvider>
      <LoadingProvider>
        <ConfirmModalProvider>
          <AlertMessageProvider>
            <FoodCartProvider>
              <RouterProvider router={router} />
            </FoodCartProvider>
          </AlertMessageProvider>
        </ConfirmModalProvider>
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>,
)
