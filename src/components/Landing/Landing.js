'use client'
import React from 'react'
import Header from './Header/Header'
import Banner from './Main-banner/Banner'
import Products from './Products/Products'
import Articles from './Articles/Articles'
import Benifits from './Benifits/Benifits'
import Footer from './Footer/Footer'
import Contact from './Contact/Contact'
import ThemeToggle from '../ThemeToggle'
import NewBanner from './NewBanner/NewBanner'
import Video from './VideoBanner/Video'



export default function Landing() {
  return (
    <>
      <Header mainnav = {true} />
      <Banner />
      <NewBanner />
      <Benifits />
      <Video />
      <Articles />
      <Contact />
      <Footer />
    </>
  )
}
