import React from 'react'

const Footer = () => {
  return (
    <section className='bg-black text-[#FFF] p-[50px] py-[60px]'>

        <div className="flex items-center">
            <div className="flex flex-col items-start">
                <img src="/assets/header/pekyicon.jpeg" alt="" className='h-[50px] !mb-[50px]' />
                <h3 className='text-[30px] !mb-[15px]'>Contacts</h3>
                <div className='flex items-center gap-[10px]'>
                    <p className='text-[20px] pl-[5px]'>+92 12345678</p>
                </div>
                <div className="flex items-center gap-[10px] !mt-[5px]">
                    <p className='text-[20px] pl-[5px]'>peky@gmail.com</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer