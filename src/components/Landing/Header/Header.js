import React from 'react'

const Header = () => {
  return (
    <>

      <header className=" bg-[#000] p-[30px] w-100%">

        <nav className='flex justify-between items-center'>

          <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />

          <div className='flex items-center gap-[50px]'>

            <ul className="flex gap-8">
              {['Home', 'Buy', 'About', 'Contact'].map((item) => (
                <li key={item} className="group relative text-white cursor-pointer">
                  <a href="#" className="relative">{item}</a>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                </li>
              ))}
            </ul>



            <svg className='' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" fill='#FFF' />
            </svg>

          </div>

        </nav>

      </header>

    </>
  )
}

export default Header