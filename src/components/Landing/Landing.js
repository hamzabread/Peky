'use client'
import React from 'react'
import Header from './Header/Header'
import Banner from './Main-banner/Banner'
import Products from './Products/Products'
import Articles from './Articles/Articles'
import Benifits from './Benifits/Benifits'
import Footer from './Footer/Footer'
import Contact from './Contact/Contact'


export default function Landing() {
  return (
    <>
      <Header />
      <Banner />
      <Benifits />
      <Products />
      <Articles />
      <Contact />
      <Footer />
    </>
  )
}
