import { useState } from 'react';

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;
  let error = null;

  try {
    const res = await fetch(`http://localhost:5000/product/${id}`);
    if (!res.ok) {
      error = `Product not found (status ${res.status})`;
    } else {
      const data = await res.json();
      if (data.success && data.product) {
        product = {
          ...data.product,
          ...data.type_details,
          images: data.images || [],
          price: data.product.price || "",
          description: data.product.description || "",
        };
      } else {
        error = data.message || "Product not found.";
      }
    }
  } catch (e) {
    error = "Failed to fetch product data";
  }

  return {
    props: { product, error },
  };
}

export default function ProductPage({ product, error }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-red-100 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <p className="text-gray-600 text-base lg:text-lg">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex];

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
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericPrice);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Products</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{product.title || product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Image Gallery */}
          <div className="space-y-4 lg:sticky lg:top-8">
            {/* Main Image */}
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
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
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

              {/* Carousel Controls */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 group"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
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
                      index === currentImageIndex
                        ? 'border-black shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${product.title || product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="mt-8 lg:mt-0 space-y-8">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                {product.title || product.name}
              </h1>
              
              {product.price && (
                <div className="flex items-baseline space-x-4 mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-black">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && product.original_price !== product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">4.0 (128 reviews)</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-black">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* Product Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-2xl">
              {product.material && (
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-black uppercase tracking-wide">Material</span>
                  <p className="text-gray-600">{product.material}</p>
                </div>
              )}
              {product.memory && (
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-black uppercase tracking-wide">Memory</span>
                  <p className="text-gray-600">{product.memory}</p>
                </div>
              )}
              {product.product_code && (
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-black uppercase tracking-wide">Product Code</span>
                  <p className="text-gray-600">{product.product_code}</p>
                </div>
              )}
              {product.type && (
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-black uppercase tracking-wide">Type</span>
                  <p className="text-gray-600">{product.type}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <button className="w-full bg-black text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-[0.98] active:scale-95 shadow-lg">
                Add to Cart
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="border-2 border-gray-300 text-black py-3 px-6 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Wishlist</span>
                  </div>
                </button>
                <button className="border-2 border-gray-300 text-black py-3 px-6 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-8 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30-day return guarantee</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}