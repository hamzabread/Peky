import React from "react";

const Articles = () => {
  return (
    <>
      <section id="#articles" className="bg-[#FFF] py-[50px]">
        <div className="custom-container">
            <h2 className="text-[45px] font-bold">Why Choose Aluminium?</h2>
            <p className="text-[16px] text-[#666] !mb-[50px]">Expert's support it too!</p>
            <div className="flex items-center gap-[30px] w-[100%]">
                {
                    [1, 2, 3].map((item) => (
                        <div key={item} className="bg-white  rounded-[10px] shadow-sm w-[100%] cursor-pointer">
                            <a target="_blank" href="https://www.wnapt.com/knowledge-center/blogs/5-benefits-of-aluminum-vs-plastic-you-need-to-know">
                            <img src={`/assets/articles/articl${item}.jpg`} alt={`Article ${item}`} className="h-[230px] object-cover object-center" />
                            <h3 className="text-[16px] p-[10px] font-bold mt-[10px]">Article {item}</h3>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
      </section>
    </>
  );2
};

export default Articles;
