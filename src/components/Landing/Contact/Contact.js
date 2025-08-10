import React from "react";

const Contact = () => {
  return (
    <section id="Contact" className="bg-[#FBFBFB] py-[50px]">
      <div className="custom-container">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className=" text-[35px] md:text-[45px] font-bold">Contact Us</h2>
          <form action="submit">
            <div className="input__parent w-[400px] !mt-[20px] pl-[20px] pr-[20px]">
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue=""
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none "
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your name*
                  </label>
                </div>
              </div>

              <div className="option-field">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue=""
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none "
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your email*
                  </label>
                </div>
              </div>

              <div className="option-field !mt-[10px]">
                <div className="relative w-full">
                  <textarea
                    name="message"
                    id="message"

                    className="peer w-full px-4 pt-6 pb-30 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-[30px] -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your message*
                  </label>
                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
