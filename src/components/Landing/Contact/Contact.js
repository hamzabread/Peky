import React, { useState } from 'react';
import { API_URL } from "@/lib/config";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const sendData = async (e) => {
    e.preventDefault(); // Prevent page reload

    const items = { name, email, message };
    setStatus("loading");

    try {
      const res = await fetch(
        `${API_URL}/products`, // <-- Replace with your endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(items),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        console.error("Fetch Failed:", result.error);
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      console.error("Network or parsing error", error);
      setStatus("error");
    }
  };

  return (
    <section id="Contact" className="bg-[#FBFBFB] py-[50px]">
      <div className="custom-container">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-[35px] md:text-[45px] font-bold">Contact Us</h2>

          <form onSubmit={sendData}>
            <div className="input__parent w-[400px] !mt-[20px] pl-[20px] pr-[20px]">
              
              {/* Name */}
              <div className="!mb-[10px]">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] rounded-[10px] outline-none border-none"
                  placeholder="Enter your name*"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] rounded-[10px] outline-none border-none"
                  placeholder="Enter your email*"
                />
              </div>

              {/* Message */}
              <div className="!mt-[10px]">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="peer w-full px-4 pt-6 pb-2 h-[120px] bg-[#f3f3f3] rounded-[10px] outline-none border-none"
                  placeholder="Enter your message*"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-[10px] bg-[#FFF] border border-[#666] rounded-sm py-[12px] px-[22px]"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </button>

              {status === "success" && (
                <p className="text-green-600 mt-2">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
