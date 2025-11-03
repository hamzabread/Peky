"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "../../components/Landing/Header/Header";
import Contact from "../../components/Landing/Contact/Contact";
import Footer from "../../components/Landing/Footer/Footer";
import { API_URL } from "../../lib/config";
import Head from "next/head";
import Choose from "../../components/Landing/Choose/Choose";

import "../../components/animations/registerGSAP";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (
          res.ok &&
          res.headers.get("content-type")?.includes("application/json")
        ) {
          const data = await res.json();
          setProducts(data);
        } else {
          // Mock data for demo
          setProducts([
            {
              id: 1,
              title: "Premium Aluminium Foil Container",
              official_name: "450ml Round Container",
              price: "850",
              image: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=800&h=600&fit=crop"
            },
            {
              id: 2,
              title: "Heavy Duty Foil Tray",
              official_name: "Large Rectangular Tray",
              price: "1200",
              image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop"
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // Mock data for demo
        setProducts([
          {
            id: 1,
            title: "Premium Aluminium Foil Container",
            official_name: "450ml Round Container",
            price: "850",
            image: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=800&h=600&fit=crop"
          },
          {
            id: 2,
            title: "Heavy Duty Foil Tray",
            official_name: "Large Rectangular Tray",
            price: "1200",
            image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const faqs = [
    {
      question: "What materials are your products made from?",
      answer: "All our products are made from high-quality food-grade aluminium foil that meets international safety standards. Our aluminium is 100% recyclable and eco-friendly."
    },
    {
      question: "Can I customize the dye colors for my orders?",
      answer: "Yes! We are the only company in Pakistan offering custom dye colors tailored to your specifications. Simply contact us with your requirements, and our team will create the perfect solution for you."
    },
    {
      question: "What is the minimum order quantity?",
      answer: "Our minimum order quantity varies by product. Standard products are sold in packs of 10 pieces. For bulk orders and custom solutions, please contact our sales team for specific MOQ requirements."
    },
    {
      question: "Do you offer delivery services?",
      answer: "Yes, we provide delivery services across Pakistan. Delivery time and charges depend on your location. Contact us for specific delivery details for your area."
    },
    {
      question: "Are your products suitable for high-temperature cooking?",
      answer: "Absolutely! Our aluminium foil products offer superior heat resistance and are perfect for cooking, baking, grilling, and food storage. They can withstand high temperatures without compromising food safety."
    },
    {
      question: "How do I place a bulk order?",
      answer: "For bulk orders, please contact us directly via phone at +92 3569562783 or +92 3269582787, or email us at pekypk@gmail.com. Our team will assist you with pricing, customization, and delivery arrangements."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
    <Header mainnav={true} />
    <div className="items-center">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-900 to-black pt-24 pb-16">
        <div className="custom-container flex items-center flex-col text-center">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white !mb-6">
                Our Premium <span className="text-[#15803d]">Products</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover our range of high-quality aluminium foil containers designed for durability, sustainability, and superior performance.
                </p>
            </div>
            </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-black border-b-[2px] border-neutral-900">
        <div className="custom-container flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#15803d]"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20">
                <p className="text-gray-400 text-xl">
                    Products are unavailable. Please check back soon.
                </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                    key={product.id}
                    className="bg-[#000] rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-[#15803d]"
                    >
                    <Link href={`/products/${product.id}`}>
                        <div className="relative overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                        <h3 className="text-xl font-bold text-white !mb-2 group-hover:text-[#15803d] transition-colors">
                            {product.title}
                        </h3>
                        <p className="text-gray-400 text-sm !mb-4">
                            {product.official_name}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-[#15803d] text-lg font-bold">
                            Rs. {product.price} / 10 Pieces
                            </p>
                            <div className="bg-[#15803d] rounded-full p-2 group-hover:scale-110 transition-transform">
                            <svg
                                className="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 4L11.3 4.7L4.6 11.3L5.3 12L11 6.3V20H12V6.3L17.7 12L18.4 11.3L11.7 4.7L12 4Z" transform="rotate(90 12 12)" />
                            </svg>
                            </div>
                        </div>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
                
                
                
            )}
           
            </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <Choose />


      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900">
        <div className="custom-container flex flex-col items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white !mb-4">
                Frequently Asked <span className="text-[#15803d]">Questions</span>
            </h2>
            <p className="text-center text-gray-400 !mb-12 text-lg">
                Everything you need to know about our products and services
            </p>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden transition-all hover:border-[#15803d]"
                >
                    <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#333] transition-colors"
                    >
                    <span className="text-lg font-semibold text-white pr-8">
                        {faq.question}
                    </span>
                    <ChevronDown
                        className={`w-6 h-6 text-[#15803d] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                        }`}
                    />
                    </button>
                    <div
                    className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                    >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                        {faq.answer}
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
      </section>

    <Contact />
    <Footer />            

    </div>
    </>
  );
}