"use client";
import React, { useState } from 'react';

export default function ProductReview({ reviews = [], averageRating = 0, totalReviews = 0 }) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
   
  };

  const renderStars = (rating, size = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400' : 'text-neutral-700'
            } fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const getRatingBreakdown = () => {
    if (!reviews || !reviews.length) return [];
    
    const breakdown = [5, 4, 3, 2, 1].map(rating => {
      const count = reviews.filter(r => r.rating === rating).length;
      const percentage = (count / totalReviews) * 100;
      return { rating, count, percentage };
    });
    
    return breakdown;
  };

  const displayedReviews = showAllReviews 
    ? reviews 
    : reviews.slice(0, 3);

  return (
    <div className="!mt-8 space-y-6 ">
      <h2 className="text-3xl !mb-3 font-bold text-white">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 pb-8 border-b border-neutral-800">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center text-center bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          <div className="text-5xl font-bold text-white !mb-2">
            {averageRating > 0 ? averageRating : '0.0'}
          </div>
          {renderStars(Math.round(averageRating), 'lg')}
          <p className="text-neutral-400 !mt-2">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2 bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          {totalReviews > 0 ? (
            getRatingBreakdown().map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-neutral-400 text-sm w-8">{rating} ★</span>
                <div className="flex-1 bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-600 h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-neutral-400 text-sm w-12 text-right">
                  {count}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-neutral-500 py-4">
              No ratings yet
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      {reviews && reviews.length > 0 ? (
        <>
          <div className="space-y-4">
            {displayedReviews.map((review, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between !mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-semibold text-white">
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {review.reviewer_name}
                      </p>
                      <p className="text-neutral-500 text-sm">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  {renderStars(review.rating, 'sm')}
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {showAllReviews ? (
                <>
                  Show Less
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show All {reviews.length} Reviews
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-neutral-900 rounded-xl border border-neutral-800">
          <svg className="w-16 h-16 text-neutral-700 !mx-auto !mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-neutral-400 text-lg !mb-2">No reviews yet</p>
          <p className="text-neutral-500 text-sm">Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
}