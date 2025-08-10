'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded additional product data
  const productExtras = {
    1: { rating: 4.8, reviews: 124, density: "Light", material: "Premium Aluminum" },
    2: { rating: 4.6, reviews: 89, density: "Medium", material: "Food Grade Aluminum" },
    3: { rating: 4.9, reviews: 203, density: "Heavy", material: "Industrial Aluminum" },
    4: { rating: 4.7, reviews: 156, density: "Extra Heavy", material: "Commercial Grade" }
  };

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
          console.warn("Unexpected response from /products:", res.status);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          <path fill="none" stroke="currentColor" strokeWidth="1" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  const DensityIcon = () => (
    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      <circle cx="15" cy="9" r="2"/>
    </svg>
  );

  const MaterialIcon = () => (
    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  return (
    <section id="Buy" className="bg-[#FBFBFB] pt-[60px] pb-[60px]">
      <div className="custom-container">
        <h2 className="text-[35px] md:text-[45px] text-center !mb-[30px] font-bold">
          Our Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">
            Products are loading. Please check back soon.
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            Products are unavailable. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-[10px] md:gap-[60px] !pt-[30px]">
            {products.map((product) => {
              const extras = productExtras[product.id];
              return (
                <div
                  key={product.id}
                  className="bg-white pb-[25px] rounded-[15px] border-[1px] border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer group"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[200px] md:!h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="px-[20px] pt-[20px]">
                      <h3 className="text-[18px] sm:!text-[22px] font-bold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(extras.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{extras.rating}</span>
                        <span className="text-sm text-gray-500">({extras.reviews} reviews)</span>
                      </div>

                      <p className="text-[16px] sm:!text-[18px] font-bold text-blue-600 mb-4">
                        {product.price}
                      </p>

                      <p className="text-[14px] sm:!text-[16px] text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Material and Density */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <MaterialIcon />
                          <span className="text-sm font-medium text-gray-700">Material:</span>
                          <span className="text-sm text-gray-600">{extras.material}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DensityIcon />
                          <span className="text-sm font-medium text-gray-700">Density:</span>
                          <span className="text-sm text-gray-600">{extras.density}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Arrow */}
                    <div className="absolute bottom-[20px] right-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}