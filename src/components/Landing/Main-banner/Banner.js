
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";


const Banner = () => {

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

            <section id='Home' className='bg-neutral-900 !mt-[0] md:!mt-[0]'>

                <div className="relative z-10 flex bg-[#E5F7F5] flex-col justify-center items-center text-center md:h-[600px] h-[400px]">
                    <Image
                        src="/assets/main-banner/background-maincopy.png"
                        alt="Background"
                        fill
                        priority
                        className="object-cover md:object-cover object-center scale-100 z-0"
                    />

                    <h1 className="flex items-center z-10 gap-[5px] md:gap-[10px] pr-[10px] md:pr-[35px] lg:text-[65px] sm:text-[40px] text-nowrap text-[38px] font-[550] text-white">
                        <img
                            src="/assets/main-banner/peky_icon.png"
                            className="lg:h-[60px] pl-[5px] h-[33px]"
                            alt=""
                        />
                        Peky
                    </h1>

                    <span
                        ref={textRef}
                        className="block text-nowrap text-[18px] sm:text-[25px] text-white lg:text-[33px]"
                    >
                        Healthier Choice
                    </span>
                </div>

            </section >


        </>
    )
}

export default Banner