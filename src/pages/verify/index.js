import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Landing/Header/Header";
import { API_URL } from "../../lib/config";

const VerifyEmail = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Get email + username from session storage (set during signup)
    const pendingEmail = sessionStorage.getItem("pendingVerificationEmail");
    const pendingUsername = sessionStorage.getItem("pendingUsername");

    if (pendingEmail) setEmail(pendingEmail);
    if (pendingUsername) setUsername(pendingUsername);

    if (!pendingEmail) router.push("/signup");
  }, [router]);

  useEffect(() => {
    // Handle resend cooldown timer
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.length < 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          code: verificationCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.error || "Verification failed");
        setIsLoading(false);
        return;
      }

      setSuccess(true);

      // Clear session storage
      sessionStorage.removeItem("pendingVerificationEmail");
      sessionStorage.removeItem("pendingUsername");

      // Store verified email for login page
      localStorage.setItem("userEmail", email);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Network or parsing error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    const username = sessionStorage.getItem("pendingUsername");
    if (!username) {
      setError("No username found for verification");
      return;
    }

    setResendLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.error || "Failed to resend code");
        return;
      }

      alert("A new verification code has been sent to your email.");
      setResendCooldown(30); // 30-second cooldown
    } catch (err) {
      console.error("Resend failed:", err);
      setError("Network error. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleCodeInput = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) setVerificationCode(value);
  };

  return (
    <>
      <Header />
      <div className="min-h-[100vh] pt-[100px] flex flex-col justify-center items-center">
        <div className="bg-white flex flex-col justify-center items-center rounded-[5px] shadow-lg w-[450px]">
          <h3 className="bg-black w-full text-white text-center p-[20px] text-[20px] rounded-t-[5px]">
            Verify Your Email
          </h3>

          {!success ? (
            <div className="p-[30px] w-full">
              <div className="text-center !mb-6">
                <div className="!mb-4">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm !mb-2">
                  We've sent a verification code to:
                </p>
                <p className="text-black font-semibold !mb-4">{email}</p>
                <p className="text-gray-500 text-xs">
                  Please check your email and enter the 6-digit code below
                </p>
              </div>

              <form onSubmit={handleVerify}>
                <div className="!mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-[#f3f3f3] rounded-[10px] outline-none focus:ring-2 focus:ring-black"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={handleCodeInput}
                    maxLength={6}
                    disabled={isLoading}
                    autoFocus
                  />
                  <p className="text-gray-500 text-xs !mt-2 text-center">
                    Enter 6-digit verification code
                  </p>
                </div>

                {error && (
                  <div className="!mb-4">
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full bg-black text-white p-[15px] rounded-[5px] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

              <div className="!mt-6 text-center">
                <p className="text-gray-600 text-sm !mb-2">Didn't receive the code?</p>
                <button
                  onClick={resendCode}
                  disabled={resendLoading || resendCooldown > 0}
                  className="text-blue-600 hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : resendLoading
                    ? "Sending..."
                    : "Resend verification code"}
                </button>
              </div>

              <div className="!mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Wrong email?{" "}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Go back to signup
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-[30px] w-full text-center">
              <div className="!mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold !mb-2">Email Verified!</h4>
              <p className="text-gray-600 text-sm !mb-4">
                Your email has been successfully verified.
              </p>
              <p className="text-gray-500 text-sm">Redirecting to login page...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
