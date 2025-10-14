import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Landing/Header/Header";
import { API_URL } from "../../lib/config";


const index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in by checking for access token
    const accessToken = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("userEmail");

    if (accessToken) {
      // Optionally verify token is still valid
      // You might want to redirect to dashboard if already logged in
      console.log("User already logged in with token");
    }

    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const login = async () => {
    setIsLoading(true);
    setError("");

    const loginData = {
      email, // or username depending on your backend
      password,
    };

    console.log("Login attempt with:", { email });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Login Failed:", result.error || result.message);
        setError(result.error || result.message || "Login failed");
        setIsLoading(false);
        return;
      }

      console.log("Login Successful", result);

      // Store tokens securely
      if (result.tokens) {
        if (result.tokens.access_token) {
          localStorage.setItem("access_token", result.tokens.access_token);
        }
        if (result.tokens.refresh_token) {
          localStorage.setItem("refresh_token", result.tokens.refresh_token);
        }
        if (result.tokens.id_token) {
          localStorage.setItem("id_token", result.tokens.id_token);
        }
        if (result.tokens.username) {
          // ✅ always store username
          localStorage.setItem("username", result.tokens.username);
        }
      } else if (result.access_token) {
        // Handle case where tokens are directly in result
        localStorage.setItem("access_token", result.access_token);
        if (result.refresh_token) {
          localStorage.setItem("refresh_token", result.refresh_token);
        }
        if (result.id_token) {
          localStorage.setItem("id_token", result.id_token);
        }
        if (result.username) {
          localStorage.setItem("username", result.username);
        }
      }

      // Store user email for future logins
      localStorage.setItem("userEmail", email);

      // Store full user info if provided
      if (result.user) {
        localStorage.setItem("user-info", JSON.stringify(result.user));
      }

      // Redirect to dashboard or home
      router.push("/"); // or router.push('/') depending on your app structure
    } catch (error) {
      console.error("Network or parsing error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const continueAsGuest = () => {
    // Clear any existing auth tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("id_token");
    router.push("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="bg-white flex flex-col justify-center items-center rounded-[5px] shadow-lg w-[400px]">
          <h3 className="bg-black w-[100%] text-white text-center p-[20px] text-[20px] rounded-t-[5px]">
            Login
          </h3>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="input__parent w-full !mt-[20px] pl-[20px] pr-[20px]">
              <div className="!mb-[10px]">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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

              <div className="option-field">
                <div className="relative w-full">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none"
                    placeholder=" "
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                  >
                    Enter your password*
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="px-[20px] mt-[10px]">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <Link
              href="/forgot"
              className="text-[12px] text-red-500 text-right w-full pt-[10px] pr-[20px] block"
            >
              Forgot Password?
            </Link>

            <div className="flex items-center gap-[10px] w-full p-[20px]">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white w-full p-[15px] rounded-[5px] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
              >
                {isLoading ? "Logging in..." : "Login"}
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
              Or sign in with
              <button className="inline">
                <img src="/assets/signup/Google.svg" alt="" />
                <p className="google__p">Google</p>
              </button>
            </h6>

            <p className="accountp">
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
