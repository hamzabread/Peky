'use client'
import Contact from '@/components/Landing/Contact/Contact';
import Footer from '@/components/Landing/Footer/Footer';
import Header from '@/components/Landing/Header/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from "../../lib/config";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Product-specific ratings and details data
  const productRatings = {
    1: { rating: 4.8, reviews: 124 },
    2: { rating: 4.6, reviews: 89 },
    3: { rating: 4.9, reviews: 203 },
    4: { rating: 4.7, reviews: 156 }
  };

  const productDetails = {
    1: { density: "Light", material: "Premium Aluminum", dimensions: "Small", capacity: "250ml" },
    2: { density: "Medium", material: "Food Grade Aluminum", dimensions: "Medium", capacity: "500ml" },
    3: { density: "Heavy", material: "Industrial Aluminum", dimensions: "Large", capacity: "750ml" },
    4: { density: "Extra Heavy", material: "Commercial Grade", dimensions: "Family", capacity: "1000ml" }
  };

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_URL}/product/${id}`);
        if (!res.ok) {
          setError(`Backend returned ${res.status}`);
          return;
        }
        const data = await res.json();
        if (data.success && data.product) {
          setProduct({
            ...data.product,
            ...data.type_details,
            images: data.images || [],
          });
        } else {
          setError(data.message || "Invalid data structure");
        }
      } catch (err) {
        setError("Failed to connect to backend");
      }
    }
    fetchProduct();
  }, [id]);

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto text-red-100 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h1 className="text-2xl lg:text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 text-base lg:text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found UI
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <p className="text-gray-600 text-base lg:text-lg">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex];

  // Get rating and details data for current product
  const ratingData = productRatings[parseInt(id)] || { rating: 4.5, reviews: 100 };
  const detailsData = productDetails[parseInt(id)] || { 
    density: "Medium", 
    material: "Standard Aluminum", 
    dimensions: "Standard", 
    capacity: "500ml" 
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setIsImageLoading(true);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsImageLoading(true);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return null;
    const numericPrice = typeof price === 'string'
      ? parseFloat(price.replace(/[^0-9.]/g, ''))
      : price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericPrice);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-fill-${id}`}>
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="#d1d5db"/>
            </linearGradient>
          </defs>
          <path fill={`url(#half-fill-${id})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const DensityIcon = () => (
    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      <circle cx="15" cy="9" r="2"/>
    </svg>
  );

  const MaterialIcon = () => (
    <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  const DimensionsIcon = () => (
    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );

  const CapacityIcon = () => (
    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );

  return (
    <div className="min-h-screen  bg-white">
      <Header />

      <div className="max-w-7xl !mt-[150px] !mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          
          {/* Image Gallery */}
          <div className="space-y-4 lg:sticky lg:top-8">
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {images.length > 0 && currentImage?.image_url ? (
                <>
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
                    </div>
                  )}
                  <img
                    src={currentImage.image_url}
                    alt={product.title || product.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={handleImageLoad}
                    onError={() => setIsImageLoading(false)}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400 text-lg font-medium">No image available</span>
                </div>
              )}

              {hasMultipleImages && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group" aria-label="Previous image">
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group" aria-label="Next image">
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsImageLoading(true);
                    }}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'shadow-lg scale-105' : ' hover:shadow-md'
                    }`}
                  >
                    <img src={image.image_url} alt={`${product.title || product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="mt-8 lg:mt-0 space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                {product.title || product.name}
              </h1>
              
              {product.price && (
                <div className="flex items-baseline space-x-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-black">{formatPrice(product.price)}</span>
                  {product.original_price && product.original_price !== product.price && (
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                  )}
                </div>
              )}
              
            </div>

            {product.description && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-black">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{product.description}</p>
                </div>
              </div>
            )}

            {/* Product Specifications */}
            <div className="space-y-6">
              <h2 className="text-xl !mb-[7px] font-semibold text-black">Product Specifications</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <MaterialIcon />
                    <h3 className="font-semibold text-gray-800">Material</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{detailsData.material}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <DensityIcon />
                    <h3 className="font-semibold text-gray-800">Density</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{detailsData.density}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <DimensionsIcon />
                    <h3 className="font-semibold text-gray-800">Size</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{detailsData.dimensions}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <CapacityIcon />
                    <h3 className="font-semibold text-gray-800">Capacity</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{detailsData.capacity}</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6 ">
              <h2 className="text-xl !mb-[10px] !mt-[10px] font-semibold text-black">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                  product.food_safe?
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 font-medium">Food Safe</span>
                </div> : ""
                }
                {
                  product.heat_resistant?
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-blue-800 font-medium">Heat Resistant</span>
                </div> : ""
}
                {
                  product.eco_friendly?
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-purple-800 font-medium">Eco-Friendly</span>
                </div> : ""
}
                
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-orange-800 font-medium">Recyclable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
}