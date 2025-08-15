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
          <div className="flex items-center gap-[10px]">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6807.401612569258!2d74.142349!3d31.255882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918fd7b3c1b7b77%3A0xa6b60cba9b7f3c86!2s64C%20Small%20Industrial%20Estate%2C%20Sundar%20Road%2C%20Raiwind%2055150%2C%20Lahore!5e0!3m2!1sen!2s!4v1698413123456!5m2!1sen!2s"
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
