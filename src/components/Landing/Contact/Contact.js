import React, { useState } from 'react';
import { API_URL } from "@/lib/config";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const sendData = async (e) => {
    e.preventDefault(); // prevent page reload
    setStatus({ loading: true, success: null, error: null });

    const items = { name, email, phone, message };

    try {
      const res = await fetch(`${API_URL}/contact`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(items),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setStatus({ loading: false, success: null, error: result.error || "Something went wrong" });
        return;
      }

      // Clear form if successful
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setStatus({ loading: false, success: "Message sent successfully!", error: null });

    } catch (error) {
      setStatus({ loading: false, success: null, error: "Network error. Please try again." });
    }
  };

  return (
    <section id='Contact' className='bg-[#FBFBFB] py-[50px]'>
      <div className="custom-container">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-[35px] md:text-[45px] font-bold">Contact Us</h2>
          <form onSubmit={sendData}>
            <div className="input__parent w-[400px] !mt-[20px] pl-[20px] pr-[20px]">

              {/* Name */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0">
                    Enter your name*
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="option-field !mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0">
                    Enter your email*
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div className="option-field !mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="peer w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label htmlFor="phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0">
                    Enter your phone (optional)
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="option-field !mt-[10px]">
                <div className="relative w-full">
                  <textarea
                    name="message"
                    id="message"
                    required
                    value={message}
                    className="peer w-full px-4 pt-6 pb-2 h-[120px] bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute left-4 top-[20px] -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0">
                    Enter your message*
                  </label>
                </div>
              </div>

              {/* Status Message */}
              {status.loading && (
                <p className="text-blue-500 text-sm mt-3 text-center">Sending...</p>
              )}
              {status.success && (
                <p className="text-green-500 text-sm mt-3 text-center">{status.success}</p>
              )}
              {status.error && (
                <p className="text-red-500 text-sm mt-3 text-center">{status.error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className='!ml-auto !mt-[10px] w-full !mr-auto bg-[#FFF] text-black border-[1px] border-[#666] rounded-sm pt-[10px] pb-[10px] pl-[22px] pr-[22px]'
                disabled={status.loading}
              >
                {status.loading ? "Submitting..." : "Submit"}
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
