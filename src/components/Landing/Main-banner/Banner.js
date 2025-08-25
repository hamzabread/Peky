import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";


const Banner = () => {

    const handleAddressChange = (event) => {
        // Handle address input change
        console.log(event.target.value);
    };

    const handleSearch = () => {
        // Handle search action
        console.log("Search initiated");
    };

    const bannerItems = [
        { icon: <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M30.7 72.3C37.6 48.4 59.5 32 84.4 32l344 0c24.9 0 46.8 16.4 53.8 40.3l23.4 80.2c12.8 43.7-20.1 87.5-65.6 87.5-26.3 0-49.4-14.9-60.8-37.1-11.6 21.9-34.6 37.1-61.4 37.1-26.6 0-49.7-15-61.3-37-11.6 22-34.7 37-61.3 37-26.8 0-49.8-15.1-61.4-37.1-11.4 22.1-34.5 37.1-60.8 37.1-45.6 0-78.4-43.7-65.6-87.5L30.7 72.3zM96.4 352l320 0 0-66.4c7.6 1.6 15.5 2.4 23.5 2.4 14.3 0 28-2.6 40.5-7.2l0 151.2c0 26.5-21.5 48-48 48l-352 0c-26.5 0-48-21.5-48-48l0-151.2c12.5 4.6 26.1 7.2 40.5 7.2 8.1 0 15.9-.8 23.5-2.4l0 66.4z"></path></svg>, title: '4 Products', subtitle: 'Available nationwide' },
        { icon: <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" /></svg>, title: 'Aluminium Foil F1', subtitle: 'Durable and versatile' },
        { icon: <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" /></svg>, title: 'Aluminium Foil F2', subtitle: 'Perfect for cooking' },
        { icon: <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" /></svg>, title: 'Aluminium Foil F3', subtitle: 'Ideal for storage' }
    ]

    const textRef = useRef(null);
    const texts = ["Healthier Choice", "Reliable", "Durable Packaging", "Trusted Quality", "Nationwide Supply"];
    let index = 0;

    useEffect(() => {
        const el = textRef.current;

        const changeText = () => {
            // animate down + fade out
            gsap.to(el, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    // change text
                    index = (index + 1) % texts.length;
                    el.textContent = texts[index];

                    // animate up + fade in
                    gsap.fromTo(
                        el,
                        { y: -30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                    );
                },
            });
        };

        const interval = setInterval(changeText, 2000); // every 3 sec
        return () => clearInterval(interval);
    }, []);

    return (

        <>

            <section id='Home' className='bg-[#FBFBFB] !mt-[80px] md:!mt-[100px]'>

                <div className="relative z-10 flex bg-[#E5F7F5] flex-col justify-center items-center text-center md:h-[600px] h-[400px]">
                    <Image
                        src="/assets/main-banner/background-main.png"
                        alt="Background"
                        fill
                        priority
                        className="object-contain md:object-cover object-center scale-100 z-0"
                    />

                    <h1 className="flex items-center z-10 gap-[10px] pr-[20px] md:pr-[35px] lg:text-[65px] sm:text-[40px] text-nowrap text-[40px] font-[550] text-black">
                        <img
                            src="/assets/main-banner/peky_icon_only.png"
                            className="lg:h-[60px] pl-[5px] h-[35px]"
                            alt=""
                        />
                        Peky
                    </h1>

                    <span
                        ref={textRef}
                        className="block text-nowrap text-[22px] sm:text-[25px] text-black lg:text-[33px]"
                    >
                        Healthier Choice
                    </span>
                </div>

                <div className="custom-container">
                    <div className='flex flex-wrap  justify-center md:!justify-between gap-[60px]  pt-[50px] pb-[50px] lg:pr-[10px] lg:pl-[10px] bg-[#FBFBFB]'>
                        {
                            bannerItems.map((item, index) => (
                                <div key={index} className="flex flex-col g-[10px] text-center items-center">
                                    {item.icon}
                                    <p className='text-[16px] md:!text-[16px] font-[600] !mt-[10px] '>{item.title}</p>
                                    <p className='text-[14px] md:!text-[14px]'>{item.subtitle}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>


        </>
    )
}

export default Banner