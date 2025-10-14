import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Landing/Header/Header";
import { API_URL } from "../../lib/config";

const index = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    address: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (error) setError("");
    if (name === "password" && passwordError) setPasswordError("");
  };

  // Validate password strength
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&.])/.test(password)) {
      return "Password must contain at least one special character (@ $ ! % * ? & .)";
    }
    return "";
  };

  // Handle signup
  const signup = async () => {
    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    // Validate required fields
    if (!formData.email || !formData.password || !formData.username) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Signup Failed:", result.message || result.error);
        setError(result.message || result.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      console.log("Signup Successful", result);
      
      // Store email for verification page
      sessionStorage.setItem("pendingVerificationEmail", formData.email);
      sessionStorage.setItem("pendingUsername", formData.username);
      
      // Redirect to verification page
      router.push(`/verify?username=${encodeURIComponent(formData.username)}&email=${encodeURIComponent(formData.email)}`);


    } catch (error) {
      console.error("Network or parsing error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const continueAsGuest = () => {
    router.push("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-[100vh] !mt-[50px] flex flex-col justify-center items-center py-10">
        <div className="bg-white flex flex-col justify-center items-center rounded-[5px] shadow-lg w-[400px]">
          <h3 className="bg-black w-[100%] text-white text-center p-[20px] text-[20px] rounded-t-[5px]">
            Sign Up
          </h3>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="input__parent w-full !mt-[20px] pl-[20px] pr-[20px]">
              {/* Email Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.email}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your email address*
                  </label>
                </div>
              </div>

              {/* Username Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.username}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your username*
                  </label>
                </div>
              </div>

              {/* Password Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                    className="peer w-full px-4 pt-6 pb-2 pr-12 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.password}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your password*
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>

              {/* Name Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.name}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your full name
                  </label>
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.phone_number}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="phone_number"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your phone number
                  </label>
                </div>
              </div>

              {/* Address Input */}
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={handleInputChange}
                    value={formData.address}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your address
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="px-[20px] mt-[10px]">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-[10px] w-full p-[20px]">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white w-full p-[15px] rounded-[5px] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={continueAsGuest}
                disabled={isLoading}
                className="bg-white text-black w-full p-[15px] rounded-[5px] border-[1px] border-black transition duration-300 ease-in-out disabled:opacity-50 hover:bg-gray-100"
              >
                Continue as Guest
              </button>
            </div>
          </form>

          <div className="flex-col flex items-center text-[#666] text-[14px] pb-[20px]">
            <h6 className="flex gap-[5px]">
              Or sign up with
              <button className="flex items-center gap-1">
                <img src="/assets/signup/Google.svg" alt="Google" />
                <span>Google</span>
              </button>
            </h6>

            <p className="accountp mt-2">
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;