import React, { useState } from 'react';
import { API_URL } from "@/lib/config";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const sendData = async (e) => {
    e.preventDefault(); 
    setStatus({ loading: true, success: null, error: null });

    const items = { name, email, phone, message };

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus({ loading: false, success: null, error: result.error || "Something went wrong" });
        return;
      }

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
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all">
                    Enter your name*
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all">
                    Enter your email*
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all">
                    Enter your phone (optional)
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="!mt-[10px]">
                <div className="relative w-full">
                  <textarea
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 h-[120px] bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-[20px] -translate-y-1/2 text-[#666] text-xs transition-all">
                    Enter your message*
                  </label>
                </div>
              </div>

              {/* Status Message */}
              {status.loading && <p className="text-blue-500 text-sm mt-3 text-center">Sending...</p>}
              {status.success && <p className="text-green-500 text-sm mt-3 text-center">{status.success}</p>}
              {status.error && <p className="text-red-500 text-sm mt-3 text-center">{status.error}</p>}

              {/* Submit */}
              <button
                type="submit"
                className='!ml-auto !mt-[10px] w-full bg-[#FFF] text-black border border-[#666] rounded-sm py-[10px]'
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
}
