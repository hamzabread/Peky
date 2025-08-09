import React from "react";

const Articles = () => {
  const articles = [
    {
      id: 1,
      image: "/assets/articles/articl1.jpg",
      category: "Aluminium",
      readTime: "5 min read",
      title: "WHY ALUMINIUM FOIL SHINES",
      description: "Learn how aluminium foil outperforms plastic in various applications.",
      link: "https://www.wnapt.com/knowledge-center/blogs/5-benefits-of-aluminum-vs-plastic-you-need-to-know"
    },
    {
      id: 2,
      image: "/assets/articles/articl2.jpg",
      category: "Sustainability",
      readTime: "5 min read",
      title: "THE VERSATILITY OF FOIL",
      description: "Explore the many uses of aluminium foil in daily life.",
      link: "https://www.wnapt.com/knowledge-center/blogs/5-benefits-of-aluminum-vs-plastic-you-need-to-know"
    },
    {
      id: 3,
      image: "/assets/articles/articl3.jpg",
      category: "Innovation",
      readTime: "5 min read",
      title: "ALUMINIUM VS. PLASTIC",
      description: "Understand why aluminium is a superior choice for packaging.",
      link: "https://www.wnapt.com/knowledge-center/blogs/5-benefits-of-aluminum-vs-plastic-you-need-to-know"
    }
  ];

  return (
    <section id="Articles" className="bg-[#FFF] py-[80px]">
      <div className="custom-container  mx-auto ">
        <div className="text-center !mb-[60px]">
          <p className="text-[#666] text-sm font-medium mb-2 tracking-wide">BLOG</p>
          <h2 className="text-black text-[35px] md:!text-[45px] font-bold leading-tight mb-4">
            Explore Aluminium Foil
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the benefits of aluminium foil
          </p>
        </div>
        
        <div className="flex gap-[30px] overflow-x-auto">
          {articles.map((article) => (
            <div key={article.id} className="flex-1 bg-[#FFF] min-w-[300px] border border-gray-600 rounded-lg overflow-hidden cursor-pointer group shadow-lg">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-[#f3f3f3] backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="bg-[#f3f3f3] backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded">
                      {article.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-black/70 text-xl font-bold mb-3 group-hover:text-black transition-colors uppercase">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {article.description}
                  </p>
                  <button className="text-gray-600 text-sm font-medium hover:text-black transition-colors flex items-center gap-2">
                    Read more
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;