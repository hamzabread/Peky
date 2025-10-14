import React, { useState } from "react";
import Header from "../../components/Landing/Header/Header";
import Footer from "../../components/Landing/Footer/Footer";
import  Contact  from "../../components/Landing/Contact/Contact.js";

export default function TermsAndPolicies() {
  const [activeSection, setActiveSection] = useState("terms");

  const sections = {
    terms: {
      title: "Terms & Conditions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-neutral-400">
              By accessing and using Peky's website and services, you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              2. Use of Services
            </h3>
            <p className="text-neutral-400 !mb-3">
              Our services are intended for legitimate business and personal
              use. You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>
                Provide accurate and complete information when placing orders
              </li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>
                Use our products in accordance with applicable laws and
                regulations
              </li>
              <li>Not engage in any fraudulent or harmful activities</li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              3. Product Information
            </h3>
            <p className="text-neutral-400">
              We strive to ensure that all product descriptions, specifications,
              and pricing information on our website are accurate. However, we
              reserve the right to correct any errors, inaccuracies, or
              omissions and to change or update information at any time without
              prior notice.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              4. Intellectual Property
            </h3>
            <p className="text-neutral-400">
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of Peky and
              is protected by copyright and intellectual property laws.
              Unauthorized use of any materials may violate copyright,
              trademark, and other laws.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              5. Limitation of Liability
            </h3>
            <p className="text-neutral-400">
              Peky shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of our
              products or services. Our liability is limited to the purchase
              price of the products in question.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              6. Modifications to Terms
            </h3>
            <p className="text-neutral-400">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to the website. Your
              continued use of our services after changes constitutes acceptance
              of the modified terms.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              1. Information We Collect
            </h3>
            <p className="text-neutral-400 !mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>Name, email address, phone number, and shipping address</li>
              <li>
                Payment information (processed securely through third-party
                payment processors)
              </li>
              <li>Order history and product preferences</li>
              <li>Communication records with our customer service team</li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              2. How We Use Your Information
            </h3>
            <p className="text-neutral-400 !mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and our services</li>
              <li>Improve our products, services, and customer experience</li>
              <li>Send promotional materials (with your consent)</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              3. Information Sharing
            </h3>
            <p className="text-neutral-400">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted service
              providers who assist us in operating our website, conducting our
              business, or servicing you, as long as those parties agree to keep
              this information confidential.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              4. Data Security
            </h3>
            <p className="text-neutral-400">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              5. Your Rights
            </h3>
            <p className="text-neutral-400 !mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">6. Cookies</h3>
            <p className="text-neutral-400">
              Our website uses cookies to enhance your browsing experience. You
              can choose to disable cookies through your browser settings,
              though this may affect the functionality of our website.
            </p>
          </div>
        </div>
      ),
    },
    refund: {
      title: "Return & Refund Policy",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-6 !mb-6">
            <h3 className="text-xl font-bold text-green-600 !mb-2">
              7-Day Return Window
            </h3>
            <p className="text-neutral-300">
              All products are eligible for return within 7 days of delivery if
              the wrong product was received.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              1. Eligible Returns
            </h3>
            <p className="text-neutral-400 !mb-3">
              You may return products within 7 days of delivery if:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>
                You received the wrong product (different specification or type
                than ordered)
              </li>
              <li>The product is in its original, unopened packaging</li>
              <li>
                All original packaging materials, labels, and accessories are
                included
              </li>
              <li>
                You can provide proof of purchase (order number or receipt)
              </li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              2. Non-Refundable Items
            </h3>
            <p className="text-neutral-400 !mb-3">
              The following items are NOT eligible for refund:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>
                Products damaged due to misuse, improper storage, or mishandling
              </li>
              <li>Opened or partially used products</li>
              <li>Products returned after the 7-day return window</li>
              <li>
                Custom or specially ordered items (unless wrong product
                received)
              </li>
              <li>Products without original packaging or proof of purchase</li>
            </ul>
          </div>

          <div className="bg-neutral-900 border border-red-600/30 rounded-lg p-6 !mb-6">
            <h3 className="text-xl font-bold text-red-400 !mb-2">
              Important Note on Damaged Products
            </h3>
            <p className="text-neutral-300">
              Damaged products will NOT be refunded unless the damage occurred
              during shipping and was reported within 48 hours of delivery with
              photographic evidence.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white m!b-4">
              3. Return Process
            </h3>
            <p className="text-neutral-400 !mb-3">To initiate a return:</p>
            <ol className="list-decimal list-inside text-neutral-400 space-y-2 ml-4">
              <li>Contact our customer service within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive return authorization and instructions</li>
              <li>Package the product securely in its original packaging</li>
              <li>Ship the product to our designated return address</li>
            </ol>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              4. Refund Processing
            </h3>
            <p className="text-neutral-400">
              Once we receive and inspect your return, we will notify you of the
              approval or rejection. If approved, your refund will be processed
              within 7-10 business days to your original payment method.
              Shipping costs are non-refundable unless we shipped the wrong
              product.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              5. Exchanges
            </h3>
            <p className="text-neutral-400">
              If you received the wrong product, we will gladly exchange it for
              the correct item at no additional cost. Please contact us
              immediately to arrange an exchange.
            </p>
          </div>
        </div>
      ),
    },
    shipping: {
      title: "Shipping & Service Policy",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              1. Domestic Shipping
            </h3>
            <p className="text-neutral-400 !mb-3">
              We provide nationwide delivery across Pakistan:
            </p>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
              <li>Major cities: 2-3 business days</li>
              <li>Remote areas: 5-7 business days</li>
              <li>Islands and special territories: 7-10 business days</li>
              <li>Free shipping on orders above PKR 10,000</li>
            </ul>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              3. Order Processing
            </h3>
            <p className="text-neutral-400">
              Orders are processed within 1-2 business days. You will receive a
              confirmation email with tracking information once your order has
              been shipped. Please ensure your shipping address is accurate as
              we cannot be held responsible for orders delivered to incorrect
              addresses provided by the customer.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              4. Bulk Orders
            </h3>
            <p className="text-neutral-400">
              For bulk orders exceeding 1,000 units, please contact our sales
              team directly. We offer special pricing and dedicated shipping
              arrangements for wholesale customers. Delivery times for bulk
              orders are typically 5-10 business days depending on quantity and
              location.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              5. Shipping Damage
            </h3>
            <p className="text-neutral-400">
              If your package arrives damaged, please document the damage with
              photographs and contact us within 48 hours of delivery. We will
              arrange for a replacement or refund as appropriate. Do not discard
              damaged packaging until the claim has been resolved.
            </p>
          </div>

          <div className="!mb-6">
            <h3 className="text-2xl font-bold text-white !mb-4">
              6. Tracking Your Order
            </h3>
            <p className="text-neutral-400">
              Once your order ships, you will receive a tracking number via
              email and SMS. You can track your shipment through our website or
              directly through the courier's website. For any tracking issues,
              please contact our customer service team.
            </p>
          </div>
        </div>
      ),
    },
  };

  return (
    <>
      <Header mainnav={true} />
      <div className="min-h-screen bg-black py-20">
        <div className="custom-container">
          <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center !mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white !mb-4">
                Terms & <span className="text-green-600">Policies</span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-2xl !mx-auto">
                Please read our policies carefully to understand your rights and
                obligations when using Peky's services.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 !mb-12">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`flex items-center justify-center gap-3 p-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === key
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800"
                  }`}
                >
                  <span
                    className={
                      activeSection === key ? "text-white" : "text-green-600"
                    }
                  >
                    {section.icon}
                  </span>
                  <span className="hidden md:inline">{section.title}</span>
                  <span className="md:hidden text-xs">
                    {section.title.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="bg-neutral-900 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-8 flex items-center gap-3">
                <span className="text-green-600">
                  {sections[activeSection].icon}
                </span>
                {sections[activeSection].title}
              </h2>
              {sections[activeSection].content}

              <div className="!mt-12 pt-8 border-t border-neutral-800">
                <p className="text-neutral-400 text-sm">
                  Last updated: October 14, 2025
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="!mt-12 bg-neutral-900 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white !mb-4">
                Have Questions About Our Policies?
              </h3>
              <p className="text-neutral-400 !mb-6">
                Our customer service team is here to help you understand our
                terms and policies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+923569562783"
                  className="flex items-center gap-2 text-green-600 hover:text-green-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +92 356 9562783
                </a>
                <span className="text-neutral-600 hidden sm:inline">|</span>
                <a
                  href="mailto:pekypk@gmail.com"
                  className="flex items-center gap-2 text-green-600 hover:text-green-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  pekypk@gmail.com
                </a>
              </div>
            </div>
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
