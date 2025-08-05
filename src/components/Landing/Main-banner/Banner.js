import React from 'react'

const Banner = () => {
    return (
        <>

            <section className="bg-[url('/assets/main-banner/mainbannerbg.png')] p-[130px]">
                <div className="flex flex-col items-center gap-[80px] text-center">
                    <h1 className='text-[50px]'>Premium Aluminium Foil for Every Need</h1>
                    <div className="relative w-[500px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="absolute left-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Enter your address for shipping options"
                            className="w-full p-[15px] pl-[40px] bg-white rounded-[5px] text-black"
                        />
                    </div>

                </div>
            </section>

        </>
    )
}

export default Banner