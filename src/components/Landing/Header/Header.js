
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
const API_URL = "your-api-url" // Placeholder for config

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartLoading, setCartLoading] = useState(false)
  const [cartError, setCartError] = useState("")

  const menuItems = ['Home', 'About', 'Buy', 'Articles', 'Contact']

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setIsLoggedIn(!!token)

  }, [])

  // Fetch cart items when cart opens and user is logged in
  useEffect(() => {
    if (isCartOpen && isLoggedIn) {
      fetchCartItems()
    }
  }, [isCartOpen, isLoggedIn])

  const fetchCartItems = async () => {
    // const token = localStorage.getItem("access_token")
    // if (!token) return

    setCartLoading(true)
    setCartError("")

    try {
      // Placeholder API call
      const result = { success: true, items: [] }

      if (result.success) {
        setCartItems(result.items || [])
      } else {
        setCartError(result.message || "Failed to load cart")
      }
    } catch (error) {
      console.error("Cart fetch error:", error)
      setCartError("Network error loading cart")
    } finally {
      setCartLoading(false)
    }
  }

  const handleLogout = () => {
    // localStorage.removeItem("access_token")
    // localStorage.removeItem("id_token")
    // localStorage.removeItem("refresh_token")
    setIsLoggedIn(false)
    setCartItems([])
    // window.location.href = "/"
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <>
      <header className="bg-[#000] top-0 fixed z-20 w-full left-0 p-[10px] pb-[23px] pt-[22px] md:p-[30px]">
        {/* Desktop Nav */}
        <nav className='hidden md:flex justify-between items-center'>
          <Link href='/'>
            <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
          </Link>

          <div className='flex items-center gap-[40px]'>
            {props.mainnav && (
              <ul className="flex gap-10">
                {menuItems.map((item) => (
                  <li key={item} className="group relative text-white cursor-pointer">
                    <a href={`#${item}`} className="relative">{item}</a>
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                  </li>
                ))}
              </ul>
            )}

            {/* Cart Icon */}


            {/* Login/Logout */}

          </div>
          {!isLoggedIn ? (
            <div className='flex gap-[30px] items-center'>
              <div className="relative">
                <button onClick={() => setIsCartOpen(true)} className="relative">
                  <svg
                    height="30"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className='cursor-pointer hover:opacity-80 transition-opacity'
                  >
                    <path
                      d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="40"
                    />
                  </svg>
                  {/* Cart Badge */}
                  {isLoggedIn && cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>
              </div>
              <Link href='/login' className='cursor-pointer'>
                <button className="bg-white rounded-sm px-[20px] py-[8px] text-black hover:bg-gray-100 transition-colors">Login</button>
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-[30px]'>
              <div className="relative">
                <button onClick={() => setIsCartOpen(true)} className="relative">
                  <svg
                    height="30"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className='cursor-pointer hover:opacity-80 transition-opacity'
                  >
                    <path
                      d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="40"
                    />
                  </svg>
                  {/* Cart Badge */}
                  {isLoggedIn && cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white rounded-sm px-[20px] py-[8px] text-black hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Nav */}
        <nav className='flex md:hidden justify-between items-center'>
          <Link href='/'>
            <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
          </Link>

          <div className="flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <div className="relative ">
              <button onClick={() => setIsCartOpen(true)} className="relative ">
                <svg
                  height="0"
                  width="0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className='cursor-pointer hover:opacity-80 transition-opacity'
                >
                  <path
                    d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="40"
                  />
                </svg>
                {/* Mobile Cart Badge */}
                {isLoggedIn && cartItems.length > 0 && (
                  <span className="absolute  -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4  items-center justify-center text-[10px]">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            {props.mainnav && (
              <button onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
                  <path
                    d="M31.5057 18C31.5057 18.298 31.3873 18.5838 31.1766 18.7945C30.9659 19.0052 30.6801 19.1236 30.3821 19.1236H5.66337C5.36538 19.1236 5.0796 19.0052 4.86888 18.7945C4.65817 18.5838 4.53979 18.298 4.53979 18C4.53979 17.702 4.65817 17.4163 4.86888 17.2055C5.0796 16.9948 5.36538 16.8765 5.66337 16.8765H30.3821C30.6801 16.8765 30.9659 16.9948 31.1766 17.2055C31.3873 17.4163 31.5057 17.702 31.5057 18ZM5.66337 10.135H30.3821C30.6801 10.135 30.9659 10.0166 31.1766 9.80589C31.3873 9.59518 31.5057 9.30939 31.5057 9.0114C31.5057 8.71341 31.3873 8.42762 31.1766 8.21691C30.9659 8.00619 30.6801 7.88782 30.3821 7.88782H5.66337C5.36538 7.88782 5.0796 8.00619 4.86888 8.21691C4.65817 8.42762 4.53979 8.71341 4.53979 9.0114C4.53979 9.30939 4.65817 9.59518 4.86888 9.80589C5.0796 10.0166 5.36538 10.135 5.66337 10.135ZM30.3821 25.8651H5.66337C5.36538 25.8651 5.0796 25.9835 4.86888 26.1942C4.65817 26.4049 4.53979 26.6907 4.53979 26.9887C4.53979 27.2867 4.65817 27.5724 4.86888 27.7832C5.0796 27.9939 5.36538 28.1122 5.66337 28.1122H30.3821C30.6801 28.1122 30.9659 27.9939 31.1766 27.7832C31.3873 27.5724 31.5057 27.2867 31.5057 26.9887C31.5057 26.6907 31.3873 26.4049 31.1766 26.1942C30.9659 25.9835 30.6801 25.8651 30.3821 25.8651Z"
                    fill="#FFF"
                  />
                </svg>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Menu Offcanvas */}
      <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out
                ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-black transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog" aria-modal="true"
        >
          <div className="p-6">
            <div className="flex justify-between items-center !mb-8">
              <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
              <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
            </div>
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-white text-lg hover:text-gray-300">{item}</a>
                </li>
              ))}
            </ul>
            <div className="!mt-8 pt-6 border-t border-gray-700">
              {!isLoggedIn ? (
                <Link href='/login'>
                  <button className="w-full bg-white rounded-sm px-5 py-3 text-black">Login</button>
                </Link>
              ) : (
                <button onClick={handleLogout} className="w-full bg-white rounded-sm px-5 py-3 text-black">Logout</button>
              )}
            </div>
          </div>
        </div>
      </div>




      {/* Cart Offcanvas */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 bg-opacity-20 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsCartOpen(false)}
            style={{
              opacity: isCartOpen ? 1 : 0
            }}
          ></div>
          <div
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white transform transition-transform duration-300 ease-in-out"
            style={{
              transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)'
            }}
          >
            {/* Cart Header */}
            <div className="flex justify-between items-center !p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto !p-6">
                {!isLoggedIn ? (
                  /* Not Logged In Message */
                  <div className="text-center !py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg !p-4 !mb-4">
                      <p className="text-red-600 text-sm font-medium">
                        🔐 Login for cart features
                      </p>
                    </div>
                    <p className="text-gray-500 !mb-4">Sign in to add items to your cart and save them for later.</p>
                    <Link href="/login">
                      <button className="bg-black text-white !px-6 !py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        Login Now
                      </button>
                    </Link>
                  </div>
                ) : cartLoading ? (
                  /* Loading State */
                  <div className="text-center !py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto !mb-4"></div>
                    <p className="text-gray-500">Loading your cart...</p>
                  </div>
                ) : cartError ? (
                  /* Error State */
                  <div className="text-center !py-8">
                    <p className="text-red-500 !mb-4">{cartError}</p>
                    <button
                      onClick={fetchCartItems}
                      className="bg-black text-white !px-4 !py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  /* Empty Cart */
                  <div className="text-center !py-8">
                    <svg className="mx-auto h-16 w-16 text-gray-300 !mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 !mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Add some items to get started!</p>
                  </div>
                ) : (
                  /* Cart Items */
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={item.id || index} className="flex items-center space-x-4 !p-4 border border-gray-200 rounded-lg">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name || 'Product'}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer - Only show if logged in and has items */}
              {isLoggedIn && cartItems.length > 0 && (
                <div className="border-t border-gray-200 !p-6 bg-gray-50">
                  <div className="flex justify-between items-center !mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">${calculateTotal()}</span>
                  </div>
                  <button className="w-full bg-black text-white !py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header