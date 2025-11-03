"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Footer from "../../components/Landing/Footer/Footer";
import Header from "../../components/Landing/Header/Header";


const index = () => {
  const checkmarkRef = useRef(null);
  const confettiRef = useRef(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [confettiPositions, setConfettiPositions] = useState([]);

  // Generate random values on client side only
  useEffect(() => {
    setOrderNumber(Math.floor(Math.random() * 10000));
    setConfettiPositions(
      Array.from({ length: 30 }, (_, i) => ({
        left: Math.random() * 100,
        color: i % 3 === 0 ? "#16a34a" : i % 3 === 1 ? "#22c55e" : "#4ade80",
      }))
    );
  }, []);

  useEffect(() => {
    // Checkmark animation
    if (checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    }

    // Confetti animation
    if (confettiRef.current && confettiPositions.length > 0) {
      const confettiPieces = confettiRef.current.children;
      gsap.fromTo(
        confettiPieces,
        {
          y: -100,
          opacity: 0,
          rotation: 0,
        },
        {
          y: 600,
          opacity: 1,
          rotation: 360,
          duration: 2,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [confettiPositions]);
  return (
    <>
    <Header />
     <div className=" pt-[50px] pb-[50px] min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti Elements */}
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none">
        {confettiPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${pos.left}%`,
              top: '-100px',
              width: '10px',
              height: '10px',
              backgroundColor: pos.color,
              opacity: 0
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center !mb-8">
          <div 
            ref={checkmarkRef}
            className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/50"
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white !mb-4">
            Payment Successful!
          </h1>
          <p className="text-neutral-400 text-lg !mb-8">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          {/* Order Details */}
          <div className="bg-black rounded-lg p-6 !mb-8 text-left">
            <h2 className="text-xl font-semibold text-green-600 !mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">Order Number</span>
                <span className="text-white font-semibold">
                  {orderNumber ? `#PKY-${orderNumber}` : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">Payment Status</span>
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Confirmed
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Estimated Delivery</span>
                <span className="text-white font-semibold">2-3 Business Days</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-6 !mb-8 text-left">
            <h3 className="text-lg font-semibold text-green-600 !mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What's Next?
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 !mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You'll receive an email confirmation shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 !mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Track your order status via email or phone</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 !mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Your order will be processed within 1-2 business days</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 inline-block"
            >
              Return to Home
            </Link>
            <Link 
              href="/buy"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 inline-block"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Contact Support */}
          <div className="!mt-8 pt-8 border-t border-neutral-800">
            <p className="text-neutral-400 text-sm !mb-4">
              Need help with your order?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <p
                href="tel:+923569562783"
                className="flex items-center gap-2 text-green-600 hover:text-green-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +92 3159982783
              </p>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <a
                href="mailto:pekypk@gmail.com"
                className="flex items-center gap-2 text-green-600 hover:text-green-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                pekypk@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="!mt-8 flex flex-wrap justify-center items-center gap-6 text-neutral-500 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default index;
