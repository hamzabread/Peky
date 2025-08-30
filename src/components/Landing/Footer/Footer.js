import React from "react";

const Footer = () => {
  return (
    <section className="bg-black text-[#FFF] p-[50px] py-[60px]">
      <div className="flex flex-col lg:flex-row items-center gap-[40px]">
        {/* Contact Info */}
        <div className="flex flex-col w-full items-center lg:items-start">
          <img
            src="/assets/header/pekyicon.jpeg"
            alt=""
            className="h-[50px] !mb-[50px]"
          />
          <h3 className="text-[30px] !mb-[15px]">Contacts</h3>
          <div className="flex flex-col items-center gap-[10px] sm:flex-row">
            <p className="text-[20px] pl-[5px]">+92 3159982783</p>
            <p className="text-[20px] pl-[5px]">+92 3369982787</p>
          </div>
          <div className="flex items-center gap-[10px] !mt-[5px]">
            <p className="text-[20px] pl-[5px]">pekypk25@gmail.com</p>
          </div>
        </div>

        <div className="w-full !mt-8 md:!mt-0 lg:w-[500px] h-[300px] relative">
          <a
            href="https://www.google.com/maps/place/Sunder+Small+Industrial+Estate+II/@31.3168622,74.151465,15z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/location.png"
              alt="Peky Location"
              className="w-full h-full object-cover rounded scale-120"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-medium opacity-0 hover:opacity-100 transition">
              View on Google Maps
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
