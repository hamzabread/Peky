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
            <p className="text-[20px] pl-[5px]">+92 3369992787</p>
          </div>
          <div className="flex items-center gap-[10px] !mt-[5px]">
            <p className="text-[20px] pl-[5px]">pekypk25@gmail.com</p>
          </div>
        </div>

        {/* Map */}
        <div className="w-full lg:w-[500px] h-[300px]">
          <iframe
            title="Peky Location"
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13694.30791531838!2d74.151465!3d31.3168622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855b351f06949%3A0x4d3a96c03254b37a!2sSunder%20Small%20Industrial%20Estate%20II!5e0!3m2!1sen!2s!4v1698413123456!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Footer;
